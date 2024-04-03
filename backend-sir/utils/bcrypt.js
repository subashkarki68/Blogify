const bcrypt = require("bcryptjs");

const hashPassword = (string) => {
  return bcrypt.hashSync(string, Number(process.env.SALT_ROUND));
};

const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = { hashPassword, comparePassword };
