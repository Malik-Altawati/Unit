const isEmpty = require("is-empty");
const Validator = require("validator");
const loginInputValidation = function(data) {
  let errors = {};
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  if (Validator.isEmpty(data.email)) {
    errors.email = "email field required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "enter your password";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
module.exports = loginInputValidation;
