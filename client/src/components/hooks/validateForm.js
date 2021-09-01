export default function validateForm(values, data) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = "Username required";
    errors.usernameNotValid = true;
  }

  if (!values.email) {
    errors.email = "Email required";
    errors.emailNotValid = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email is invalid";
    errors.emailNotValid = true;
  }

  if (!values.password) {
    errors.password = "Password is required";
    errors.passwordNotValid = true;
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characers or more";
    errors.passwordNotValid = true;
  }

  if (!values.password2) {
    errors.password2 = "Please re-type your password";
    errors.password2NotValid = true;
  } else if (values.password2 !== values.password) {
    errors.password2 = "Password do not match";
    errors.password2NotValid = true;
  }

  if (data) {
    if (data === 480) {
      errors.email = "Email already taken";
      errors.username = "Username already taken";
      errors.usernameNotValid = true;
      errors.emailNotValid = true;
    }
    if (data === 481) {
      errors.username = "Username already taken";
      errors.usernameNotValid = true;
    }

    if (data === 482) {
      errors.email = "Email already taken";
      errors.emailNotValid = true;
    }
  }

  return errors;
}
