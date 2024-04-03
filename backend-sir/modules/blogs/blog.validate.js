const Joi = require("joi");

const Schema = Joi.object({
  title: Joi.string().min(10).required(),
  slug: Joi.string(),
  author: Joi.string().required(),
  status: Joi.string().valid("draft", "published").default("draft"),
  content: Joi.string().min(20).required(),
  pictureUrl: Joi.string(),
  duration: Joi.number(),
});

const validate = (req, res, next) => {
  req.body.author = req.body.author || req.currentUser;
  const { error } = Schema.validate(req.body);
  if (error) next(e);
  next();
};

module.exports = { validate };
