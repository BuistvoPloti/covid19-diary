const emojiUnicode = require("emoji-unicode");

const compareEmojiUnicode = (emojiA, emojiB) => {
  return emojiUnicode(emojiA) === emojiUnicode(emojiB)
};

module.exports = {
  compareEmojiUnicode,
};
