module.exports.validateRequired = (req, res, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    res.json({
      status: false,
      message: `Validation error: ${error.details
        .map((x) => x.message)
        .join(", ")}`,
    });
  } else {
    req.body = value;
    next();
  }
};
