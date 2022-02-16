const Joi = require("joi");

const validatePostCont = (req, res, next) => {
  const postContSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string()
      .min(2)
      .max(20)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().min(6).max(12).required(),
    favorite: Joi.bool().default(false).required(),
  });
  const { error } = postContSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

const validateUpdCont = (req, res, next) => {
  const updContSchema = Joi.object({
    name: Joi.string().min(2).max(20),
    email: Joi.string()
      .min(2)
      .max(20)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    phone: Joi.string().min(6).max(12),
    favorite: Joi.bool().default(false),
  });
  const { error } = updContSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

const validateUpdFavField = (req, res, next) => {
  const updFavSchema = Joi.object({
    favorite: Joi.bool().default(false).required(),
  });
  const { error } = updFavSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};
module.exports = {
  validatePostCont,
  validateUpdCont,
  validateUpdFavField,
};
