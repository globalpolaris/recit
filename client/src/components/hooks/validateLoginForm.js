export default function ValidateLogin(values, data) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = "Input your username";
    errors.usernameNotValid = true;
  }

  if (!values.password) {
    errors.password = "Input your password";
    errors.passwordNotValid = true;
  }

  if (data) {
    if (data === 404) {
      errors.username = "Username not found";
      errors.usernameNotValid = true;
    }
    if (data === 401) {
      errors.password = "Wrong password";
      errors.passwordNotValid = true;
    }
  }

  return errors;
}
