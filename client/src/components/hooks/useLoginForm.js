import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoginHandler from "../../adapters/loginHandler";

const useLoginForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responses = await LoginHandler(values);
    setErrors(validate(values, responses));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, []);

  return { handleChange, values, handleSubmit, errors };
};

export default useLoginForm;
