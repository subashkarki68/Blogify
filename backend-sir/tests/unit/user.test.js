// userController.test.js

const userModel = require("../../modules/users/user.model");
const {
  register,
  generateFPToken,
} = require("../../modules/users/user.controller");
const { hashPassword } = require("../../utils/bcrypt");
const { mail } = require("../../services/mailer");
const common = require("../common");

// Mock Bcrypt's hashPassword function
jest.mock("../../utils/bcrypt", () => ({
  hashPassword: jest.fn((password) => "hashPassword"),
  comparePassword: jest.fn(
    (password, hashPassword) => password === hashPassword
  ),
}));

// Mock Bcrypt's hashPassword function
jest.mock("../../utils/token", () => ({
  generateRandomToken: jest.fn(() => "123456"),
}));

// Mock Mailer's mail function
jest.mock("../../services/mailer", () => ({
  mail: jest.fn(
    () => "<info>@mail.com<d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>"
  ),
}));

// Mock Mongoose's create function
jest.spyOn(userModel, "create");
jest.spyOn(userModel, "findOne");
jest.spyOn(userModel, "updateOne");

describe("User Registration Testing", () => {
  beforeAll(async () => {
    await common.connectDatabase();
  });

  afterAll(async () => {
    await common.closeDatabase();
  });
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it("should register a new user and send registration email", async () => {
    // Mock request data
    const payload = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
      // Other payload properties...
    };

    // Mock User model's create function
    userModel.create.mockResolvedValueOnce(payload);

    // Call the register function
    const registrationResult = await register(payload);

    // Check the registration result
    expect(registrationResult).toEqual({
      success: true,
      message: "Registration Completed",
    });

    // Check if Bcrypt's hashPassword function was called with the correct arguments
    expect(hashPassword).toHaveBeenCalledWith("testpassword");

    // Check if User model's create function was called with the correct payload
    expect(userModel.create).toHaveBeenCalledWith(payload);

    // Check if Mailer's mail function was called with the correct arguments
    expect(mail).toHaveBeenCalledWith(
      "test@example.com",
      "Registration Completed",
      "You are successfully registered. Thank you for registering."
    );
  });

  it("should handle registration failure", async () => {
    // Mock request data
    const payload = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
      // Other payload properties...
    };

    // Mock User model's create function to simulate registration failure
    userModel.create.mockRejectedValueOnce(new Error("Registration failed"));

    // Attempt to register
    await expect(register(payload)).rejects.toThrow("Registration failed");

    // Check if Bcrypt's hashPassword function was called with the correct arguments
    expect(hashPassword).toHaveBeenCalledWith("testpassword");

    // Check if User model's create function was called with the correct payload
    expect(userModel.create).toHaveBeenCalledWith(payload);

    // Check that Mailer's mail function was not called in case of failure
    expect(mail).not.toHaveBeenCalled();
  });
});

describe("User Verification Testing", () => {
  beforeAll(async () => {
    await common.connectDatabase();
  });

  afterAll(async () => {
    await common.closeDatabase();
  });

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it("should generate a forget password token and send it via email", async () => {
    // Mock request data
    const registerPayload = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
      // Other payload properties...
    };
    // Mock User model's create function
    userModel.create.mockResolvedValueOnce(registerPayload);

    // Call the register function
    await register(registerPayload);

    // Mock request data
    const payload = {
      email: "test@example.com",
      // Other payload properties...
    };

    // Mock User model's findOne and updateOne functions
    userModel.findOne.mockResolvedValueOnce({
      email: "test@example.com",
      isActive: true,
    });
    userModel.updateOne.mockResolvedValueOnce({ token: "mockedToken" });

    // Mock generateRandomToken function
    jest.spyOn(Math, "random").mockReturnValue(0.5); // Mock for deterministic token generation

    // Call the generateFPToken function
    const tokenGenerationResult = await generateFPToken(payload);

    // Check the token generation result
    expect(tokenGenerationResult).toBe(
      "Forget password token generated successfully"
    );

    // Check if User model's findOne function was called with the correct arguments
    expect(userModel.findOne).toHaveBeenCalledWith({
      email: "test@example.com",
      isActive: true,
    });

    // Check if User model's updateOne function was called with the correct arguments
    expect(userModel.updateOne).toHaveBeenCalledWith(
      { email: "test@example.com" },
      { token: "123456" }
    );

    // Check if Mailer's mail function was called with the correct arguments
    expect(mail).toHaveBeenCalledWith(
      "test@example.com",
      "Forget Password Token",
      "Your token is 123456"
    );
  });

  it("should handle forget password token generation failure due to missing email", async () => {
    // Mock request data without email
    const payload = {
      // Other payload properties...
    };

    // Attempt to generate a forget password token without an email
    await expect(generateFPToken(payload)).rejects.toThrow(
      "Email doesn't exist"
    );

    // Check that User model's findOne function was not called
    expect(userModel.findOne).not.toHaveBeenCalled();

    // Check that User model's updateOne function was not called
    expect(userModel.updateOne).not.toHaveBeenCalled();

    // Check that Mailer's mail function was not called
    expect(mail).not.toHaveBeenCalled();
  });

  it("should handle forget password token generation failure due to non-existing user", async () => {
    // Mock request data
    const payload = {
      email: "nonexistinguser@example.com",
      // Other payload properties...
    };

    // Mock User model's findOne function to simulate a non-existing user
    userModel.findOne.mockResolvedValueOnce(null);

    // Attempt to generate a forget password token for a non-existing user
    await expect(generateFPToken(payload)).rejects.toThrow(
      "User doesn't exist"
    );

    // Check if User model's findOne function was called with the correct arguments
    expect(userModel.findOne).toHaveBeenCalledWith({
      email: "nonexistinguser@example.com",
      isActive: true,
    });

    // Check that User model's updateOne function was not called
    expect(userModel.updateOne).not.toHaveBeenCalled();

    // Check that Mailer's mail function was not called
    expect(mail).not.toHaveBeenCalled();
  });

  it("should handle forget password token generation failure due to update error", async () => {
    // Mock request data
    const payload = {
      email: "test@example.com",
      // Other payload properties...
    };

    // Mock User model's findOne function
    userModel.findOne.mockResolvedValueOnce({
      email: "test@example.com",
      isActive: true,
    });

    // Mock User model's updateOne function to simulate an update error
    userModel.updateOne.mockRejectedValueOnce(
      new Error("Something went wrong. Try again later")
    );

    // Attempt to generate a forget password token with an update error
    await expect(generateFPToken(payload)).rejects.toThrow(
      "Something went wrong. Try again later"
    );

    // Check if User model's findOne function was called with the correct arguments
    expect(userModel.findOne).toHaveBeenCalledWith({
      email: "test@example.com",
      isActive: true,
    });

    // Check if User model's updateOne function was called with the correct arguments
    expect(userModel.updateOne).toHaveBeenCalledWith(
      { email: "test@example.com" },
      { token: expect.any(String) }
    );

    // Check that Mailer's mail function was not called
    expect(mail).not.toHaveBeenCalled();
  });
});
