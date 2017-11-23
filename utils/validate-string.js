const validate = (string, options) => {
  const { regex, error } = options;
  const isInvalid = !regex.test(string);
  if (isInvalid) {
    throw error;
  }
};

module.exports = validate;
