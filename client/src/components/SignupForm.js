import React from "react";
import useForm from "./hooks/useForm";
import validate from "./hooks/validateForm";
import TextField from "@material-ui/core/TextField";
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "50ch",
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
  login: {
    fontSize: "0.8rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px",
    },
  },
  heading: {
    fontSize: "3em",
    marginBottom: 35,
  },
  clickLogin: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
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
}));

const containerStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "3em",
  },
}));

const SignupForm = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );
  const classes = useStyles();
  const container = containerStyle();
  return (
    <Container className={container.root}>
      <Typography className={classes.heading}>Create an account</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.root}>
          <TextField
            required
            className={classes.forms}
            variant="outlined"
            label="username"
            name="username"
            InputLabelProps={{
              shrink: true,
            }}
            value={values.username}
            onChange={handleChange}
            error={errors.usernameNotValid}
            helperText={errors.usernameNotValid && errors.username}
          />
          <TextField
            required
            variant="outlined"
            label="email"
            name="email"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            value={values.email}
            onChange={handleChange}
            error={errors.emailNotValid}
            helperText={errors.emailNotValid && errors.email}
          />
          <TextField
            required
            variant="outlined"
            label="password"
            name="password"
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            value={values.password}
            onChange={handleChange}
            error={errors.passwordNotValid}
            helperText={errors.passwordNotValid && errors.password}
          />
          <TextField
            required
            className={classes.forms}
            variant="outlined"
            label="confirm password"
            name="password2"
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            value={values.password2}
            onChange={handleChange}
            error={errors.password2NotValid}
            helperText={errors.password2NotValid && errors.password2}
          />
        </div>
        <div className={classes.buttonDiv}>
          <Typography className={classes.login}>
            or
            <a className={classes.clickLogin} href="/login">
              {" "}
              Login
            </a>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            className={classes.button}
            labelStyle={{ color: "#fff" }}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SignupForm;
