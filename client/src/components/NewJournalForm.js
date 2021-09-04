import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, makeStyles, Typography } from "@material-ui/core";
import newJournal from "./hooks/newJournal";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  confirmationButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 15,
  },
}));
export default function AddJournal({ submitForm }) {
  const classes = useStyles();
  const { handleChange, handleSubmit } = newJournal(submitForm);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Typography variant="h6">
                Are you sure you want to cancel?
              </Typography>
              <Typography>All changes will be discarded!</Typography>
              <div className={classes.confirmationButton}>
                <Button
                  className={classes.b}
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => (window.location = "/notes")}
                >
                  Yes
                </Button>
                <Button
                  className={classes.b}
                  size="small"
                  onClick={() => setOpen(false)}
                >
                  No
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
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
          <Button className={classes.b} onClick={handleOpen}>
            Cancel
          </Button>
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
