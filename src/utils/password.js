const bcrypt = require("bcrypt");

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);

  const encrypted = await bcrypt.hash(password, salt);

  return encrypted;
}

async function verifyPassword(password, encryptPassword) {
  const verified = await bcrypt.compare(password, encryptPassword);

  return verified;
}

module.exports = {
  encryptPassword,
  verifyPassword,
};
