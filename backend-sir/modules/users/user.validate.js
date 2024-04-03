const Joi = require("joi");

const Schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com"] },
    })
    .required(),
  name: Joi.string().min(3).max(50).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@_$&]{3,30}$"))
    .required(),
  roles: Joi.array().items(Joi.string().valid("user", "admin")),
});

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com"] },
    })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@_$&]{3,30}$"))
    .required(),
  roles: Joi.array().items(Joi.string().valid("admin", "user")),
});

const validate = (req, res, next) => {
  const { error } = Schema.validate(req.body);
  if (error) next(error.details[0].message);
  next();
};

const login = (req, res, next) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) next(error.details[0].message);
  next();
};

module.exports = { validate, login };
