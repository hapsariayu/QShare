const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(7);

function hashPassword(password) {
  return bcrypt.hashSync(password, salt);
}

function verifPassword(formPass, hashPass) {
  return bcrypt.compareSync(formPass, hashPass);
}

module.exports = { hashPassword, verifPassword };
