const TOKEN_LENGTH = 64;
const ALPHA_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXY";
const ALPHA_LOWER = "abcdefghijklmnopqrstuvwxyz";
const ALPHA = ALPHA_UPPER + ALPHA_LOWER;
const DIGIT = "0123456789";
const ALPHA_DIGIT = ALPHA + DIGIT;

const generateToken = () => {
  const base = ALPHA_DIGIT.length;
  let key = "";
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    const index = Math.floor(Math.random() * base);
    key += ALPHA_DIGIT[index];
  }
  return key;
};

module.exports = {
  generateToken,
};