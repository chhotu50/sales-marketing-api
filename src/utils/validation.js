const Joi = require("joi");
const validateRequest = require("./validate_required");
function registerValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.number()
      .integer()
      .min(1000000000)
      .message("Invalid mobile number")
      .max(9999999999)
      .message("Invalid mobile number"),
    name: Joi.string().required(),
  }).unknown(true);
  validateRequest.validateRequired(req, res, next, schema);
}

function loginValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  validateRequest.validateRequired(req, res, next, schema);
}

function titleValidation(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
  });
  validateRequest.validateRequired(req, res, next, schema);
}

module.exports = {
  registerValidation,
  loginValidation,
  titleValidation,
};
