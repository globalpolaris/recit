import { useState, useEffect } from "react";
import NewJournalHandler from "../../adapters/NewJournalHandler";

const useLoginForm = (callback) => {
  const [values, setValues] = useState({
    title: "",
    body: "",
  });
  const token = localStorage.getItem("accessToken");

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
    const responses = await NewJournalHandler(values, token);
    if (responses === 201) {
      window.location = "/journals";
    }
  };

  return { handleChange, values, handleSubmit };
};

export default useLoginForm;
