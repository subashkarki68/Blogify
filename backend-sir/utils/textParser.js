const slugify = require("slugify");

const generateSlug = (text) => {
  return slugify(text.concat(Date.now()), { lower: true });
};

module.exports = { generateSlug };
