import React from "react";
import Headers from "../components/Headers";
import SignupForm from "../components/SignupForm";
import SuccessForm from "../components/SuccessForm";
export default function RegisterPage() {
  const [isSubmitted, setIsStubmitted] = React.useState(false);

  function submitForm() {
    setIsStubmitted(true);
  }
  return (
    <React.Fragment>
      <Headers />
      {!isSubmitted ? <SignupForm submitForm={submitForm} /> : <SuccessForm />}
    </React.Fragment>
  );
}
