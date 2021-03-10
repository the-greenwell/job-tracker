const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

const jobsValidation = (data) => {
  const schema = Joi.object({
    company: Joi.string().min(3).max(30).required(),
    position: Joi.string().min(3).max(30).required(),
    status: Joi.string().max(30),
    link: Joi.string().max(30).allow(''),
    notes: Joi.string().max(1200).allow(''),
    starred: Joi.allow('')
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  jobsValidation
};
