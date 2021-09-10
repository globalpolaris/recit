import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import instance from "../adapters/AxiosInstance";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    marginTop: 80,
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 auto",
    width: "80%",
  },
  typography: {
    marginBottom: 23,
    textAlign: "left",
    fontWeight: 600,
  },
  btn: {
    width: 150,
    margin: "0 auto",
    marginTop: 25,
  },
});

const useStylesHomeField = makeStyles({
  root: {
    fontWeight: 500,
  },
});

export default function AnonForm() {
  const classes = useStyles();
  const textclass = useStylesHomeField();
  const [story, setStory] = React.useState("");
  const [contentError, setContentError] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!story) setContentError(true);
    else if (story) {
      setContentError(false);
      try {
        instance
          .post(`/anon-journals`, {
            body: story,
          })
          .then(() => {
            setOpen(true);
            setStory("");
          });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container className={classes.container}>
      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" className={classes.typography}>
          write story,
          <br />
          anonymously
        </Typography>
        <TextField
          InputProps={{ classes: { input: textclass.root } }}
          variant="outlined"
          label="Your story"
          multiline
          rows={5}
          required
          value={story}
          onChange={(e) => setStory(e.target.value)}
          error={contentError}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.btn}
        >
          Submit
        </Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Story submitted!
          </Alert>
        </Snackbar>
      </form>
    </Container>
  );
}
