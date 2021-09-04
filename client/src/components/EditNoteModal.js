import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { TextField, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import instance from "../adapters/AxiosInstance";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textfield: {
    margin: "15px 0",
  },
  titleText: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: "1.5em",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
  b: {
    margin: theme.spacing(1),
    fontSize: "0.8rem",
  },
}));

export default function EditNote({ title, body, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newBody, setNewBody] = React.useState(body);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const token = localStorage.getItem("accessToken");

  const config = {
    title: newTitle,
    body: newBody,
    headers: {
      "x-access-token": token,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newTitle, newBody);
    setIsSubmitting(true);
    let response = instance
      .put(
        `/journals/${id}`,
        {
          title: newTitle,
          body: newBody,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .catch((err) => console.error(err))
      .then(() => (window.location = "/notes"));
  };

  const handleOpen = () => {
    console.log("Id note: ", id);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
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
            <Typography variant="h6">Edit Note</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                className={classes.textfield}
                InputProps={{ classes: { input: classes.titleText } }}
                label="Title"
                required
                name="title"
                defaultValue={title}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <TextField
                className={classes.textfield}
                label="Note"
                required
                name="Note"
                variant="outlined"
                defaultValue={body}
                onChange={(e) => setNewBody(e.target.value)}
              />
              <div className={classes.button}>
                <Button className={classes.b} onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.b}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
