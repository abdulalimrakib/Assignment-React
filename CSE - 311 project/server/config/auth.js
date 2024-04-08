const bcrypt = require("bcrypt");

const getHashedPassword = async (plainPassword) => {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
  return hashedPassword;
};

const isPasswordValid = async (plainPassword, hashedPassword) => {
  const isValid = await bcrypt.compare(plainPassword, hashedPassword);
  return isValid;
};

module.exports = { getHashedPassword, isPasswordValid };
