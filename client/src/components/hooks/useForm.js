import { useState, useEffect } from "react";
import SignupHandler from "../../adapters/SignupHandler";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ter");

    setErrors(validate(values));
    const response = await SignupHandler(values);
    console.log(errors);
    console.log(response);
    setErrors(validate(values, response));
    if (response === 201) {
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors, callback, isSubmitting]);

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
