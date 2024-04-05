const Joi = require("joi");

const Schema = Joi.object({
  title: Joi.string().min(10).required(),
  slug: Joi.string(),
  // author: Joi.string().required(),
  author: Joi.object(),
  status: Joi.string().valid("draft", "published").default("draft"),
  content: Joi.string().min(20).required(),
  pictureUrl: Joi.string(),
  duration: Joi.number(),
});

const validate = (req, res, next) => {
  console.log("validate", req.body);
  req.body.author = req.body.author || req.currentUser;
  const { error } = Schema.validate(req.body);
  if (error) {
    console.log("error", req.body);
    next(error);
  }
  next();
};

module.exports = { validate };
