import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, makeStyles } from "@material-ui/core";
import newJournal from "./hooks/newJournal";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10em",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "1000px",
  },
  title: {
    marginBottom: "2em",
    marginRight: "15px",
    marginLeft: "15px",
  },
  titleText: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: "1.5em",
  },
  body: {
    marginBottom: "1em",
    marginRight: "15px",
    marginLeft: "15px",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "15px",
  },
  b: {
    margin: theme.spacing(1),
  },
}));
export default function AddJournal({ submitForm }) {
  const classes = useStyles();
  const { handleChange, handleSubmit } = newJournal(submitForm);

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          InputProps={{ classes: { input: classes.titleText } }}
          className={classes.title}
          label="Title"
          required
          name="title"
          onChange={handleChange}
        />
        <TextField
          name="body"
          className={classes.body}
          variant="outlined"
          label="Your story"
          multiline
          rows={25}
          onChange={handleChange}
          required
        />
        <div className={classes.button}>
          <Button className={classes.b}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.b}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
