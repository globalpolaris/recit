import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ValidateLogin from "./hooks/validateLoginForm";
import { useHistory } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import instance from "../adapters/AxiosInstance";
import useLoginForm from "./hooks/useLoginForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100%",
    marginTop: "5em",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      [theme.breakpoints.down("xs")]: {
        width: "30ch",
      },
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "space-between",
    marginRight: "1em",
    marginLeft: "1em",
    alignItems: "center",
  },
  button: {
    marginTop: "1em",
    background: "rgb(255,69,153)",
    background:
      "linear-gradient(165deg, rgba(255,69,153,1) 20%, rgba(255,112,177,1) 74%)",
    color: "#fff",
    fontWeight: 600,
    "&:hover": {
      background: "rgb(255,69,153)",
      background:
        "linear-gradient(165deg, rgba(255,69,153,1) 20%, rgba(255,25,129,1) 74%)",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: 0,
      fontSize: "10px",
    },
  },
  signUp: {
    fontSize: "0.8rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  clickSignup: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
}));

const Login = ({ submitForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { handleChange, handleSubmit, values, errors } = useLoginForm(
    submitForm,
    ValidateLogin
  );

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Typography style={{ marginBottom: "35px", fontSize: "1.5em" }}>
          Login to your account
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.form}>
            <TextField
              required
              variant="outlined"
              label="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={errors.usernameNotValid}
              helperText={errors.usernameNotValid && errors.username}
            />
            <TextField
              required
              variant="outlined"
              label="password"
              name="password"
              type="password"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={errors.passwordNotValid}
              helperText={errors.passwordNotValid && errors.password}
            />
          </div>
          <div className={classes.buttonDiv}>
            <Typography className={classes.signUp}>
              or
              <a className={classes.clickSignup} href="/signup">
                {" "}
                Sign Up
              </a>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              labelStyle={{ color: "#fff" }}
            >
              LOGIN
            </Button>
          </div>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default Login;
