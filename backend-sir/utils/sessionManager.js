const { verifyAccessToken } = require("./token");
const userModel = require("../modules/users/user.model");

const checkRole = (sysRole) => {
  return async (req, res, next) => {
    try {
      // const token = req.headers.authorization?.split(" ")[1] || null;
      const token = req.signedCookies["access_token"];
      if (!token) throw new Error("Token missing");
      const { data } = verifyAccessToken(token);
      // Check if user is active or not
      const user = await userModel.findOne({
        email: data.email,
        isActive: true,
      });
      if (!user) throw new Error("Invalid Token");
      // Compare Role
      const isValidRole = sysRole.some((role) => user.roles.includes(role));
      if (!isValidRole) throw new Error("Permission denied");
      req.currentUser = user?._id;
      req.roles = user?.roles;
      req.isAdmin = user?.roles.includes("admin");
      next();
    } catch (e) {
      next(e);
    }
  };
};
module.exports = { checkRole };
