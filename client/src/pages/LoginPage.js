import React from "react";
import Login from "../components/LoginForm";
import Headers from "../components/Headers";
import { Redirect } from "react-router";

export default function LoginPage() {
  const token = localStorage.getItem("accessToken");
  return (
    <React.Fragment>
      <Headers />
      {token ? <Redirect to="/" /> : <Login />}
    </React.Fragment>
  );
}
