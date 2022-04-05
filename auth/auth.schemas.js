const Joi = require("joi");

exports.validateSignupSchema = (req, res, next) => {
  const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    subscription: Joi.string()
      .valid("starter", "pro", "business")
      .default("starter"),
  });
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

exports.validateLoginSchema = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};
