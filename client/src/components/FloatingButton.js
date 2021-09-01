import React from "react";
import { makeStyles } from "@material-ui/core";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: 0,
    top: "auto",
    right: 50,
    bottom: 50,
    left: "auto",
    position: "fixed",
    width: "80px",
    height: "80px",
  },
}));

export default function FloatingButton() {
  const classes = useStyles();
  return (
    <div>
      <Fab
        component={Link}
        to="/create-journal"
        color="secondary"
        className={classes.button}
        aria-label="add"
      >
        <AddIcon fontSize="large" />
      </Fab>
    </div>
  );
}
