const router = require("express").Router();
const multer = require("multer");
const { login, validate } = require("./user.validate");
const { checkRole } = require("../../utils/sessionManager");
const userController = require("./user.controller");
const { date } = require("joi");
const { generateAccessToken } = require("../../utils/token");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/users");
  },
  filename: function (req, file, cb) {
    const imageName = "image".concat(
      "-",
      Date.now(),
      ".",
      file.originalname.split(".").pop()
    );
    cb(null, imageName);
  },
});

// HW file size each max 1MB
// HW file type png, jpeg, jpg
const upload = multer({ storage: storage });

// GET ALL THE USERS
router.get("/", checkRole(["admin"]), async (req, res, next) => {
  try {
    const { limit, page, name, role } = req.query; // used for search, sorting and filter
    const search = { name, role, _id: { $ne: req.currentUser } };
    // Database Operation
    const result = await userController.list(search, page, limit);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

// ADD NEW USER (Admin)
router.post("/", checkRole(["admin"]), validate, async (req, res, next) => {
  try {
    const result = await userController.create(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

//Verify User's Email (Admin)
router.patch(
  "/verify-user-email",
  checkRole(["admin"]),
  async (req, res, next) => {
    try {
      const { email, status } = req.body;
      const result = await userController.verifyUserEmail(email, status);
      console.log("result from /verify", result);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

//Update Profile (Admin)
router.patch(
  "/update-by-admin",
  checkRole(["admin"]),
  async (req, res, next) => {
    try {
      const { _id } = req.body;
      const result = await userController.updateById(_id, req.body);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

// REGISTER USER
router.post(
  "/register",
  upload.single("pictureUrl"),
  validate,
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.pictureUrl = req.file.path.replace("public", "");
      }
      const result = await userController.register(req.body);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

// LOGIN USER
router.post("/login", login, async (req, res, next) => {
  const expiryTime = new Date(
    Date.now() + parseInt(process.env.JWT_DURATION) * 60 * 60 * 24 * 1000
  );
  try {
    const result = await userController.login(req.body);
    res.cookie("access_token", generateAccessToken(result.user), {
      partitioned: true,
      signed: true,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: expiryTime,
    });
    res.json({ result });
  } catch (e) {
    next(e);
  }
});

router.post("/verify-email", async (req, res, next) => {
  try {
    const result = await userController.verifyEmailToken(req.body);
    res.json({ result });
  } catch (e) {
    next(e);
  }
});

// LOGIN USER
router.post("/generate-fp-token", async (req, res, next) => {
  try {
    const result = await userController.generateFPToken(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/verify-fp-token", async (req, res, next) => {
  try {
    const result = await userController.verifyFPToken(req.body);
    res.json({ result });
  } catch (e) {
    next(e);
  }
});

router.post("/change-forgotten-password", async (req, res, next) => {
  try {
    const result = await userController.changeForgottenPassword(req.body);
    res.json({ result });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/change-password",
  checkRole(["admin", "user"]),
  async (req, res, next) => {
    try {
      const result = await userController.changePassword(req.body);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.post("/reset-password", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.resetPassword(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.patch("/block-user", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.blockUser(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

// GET MY PROFILE
router.get(
  "/get-profile",
  checkRole(["admin", "user"]),
  async (req, res, next) => {
    try {
      const result = await userController.getProfile(req.currentUser);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

// UPDATE MY PROFILE
router.get(
  "/update-profile",
  checkRole(["admin", "user"]),
  async (req, res, next) => {
    try {
      const result = await userController.updateProfile(
        req.currentUser,
        req.body
      );
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

//Upload profile image
router.post(
  "/upload-profile-image",
  checkRole(["admin", "user"]),
  upload.single("profileImage"),
  async (req, res, next) => {
    try {
      if (req.file) {
        console.log("File received:", req.file);
        req.body.profileImage = req.file.path.replace("public", "");
      } else {
        console.log("No file received");
      }
      const result = await userController.updateProfileImage(
        req.currentUser,
        req.body.profileImage
      );
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.post("/logout", checkRole(["admin", "user"]), (req, res) => {
  // remove token from cookies
  res.clearCookie("access_token");
  res.json({ success: true, msg: "Logged out" });
});

// GET ONE USER
router.get("/:id", checkRole(["admin"]), async (req, res, next) => {
  try {
    // Database Operation
    const result = await userController.getById(req.params.id);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

// UPDATE SINGLE USER FOR MORE THAN 2 FIELDS
router.put("/:id", async (req, res, next) => {
  try {
    // Database Operation
    const result = await userController.updateById(req.params.id, req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

// UPDATE SINGLE USER FOR SINGLE FIELD
router.patch("/:id", async (req, res, next) => {
  try {
    // Database Operation
    const result = await userController.updateById(req.params.id, req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

// DELETE SINGLE USER
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await userController.removeById(req.params.id);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
