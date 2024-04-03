const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    pictureUrl: { type: String },
    isActive: { type: Boolean, default: true, required: true },
    token: { type: String }, // fp token
    emailVerifyToken: { type: String },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = new model("User", userSchema);
