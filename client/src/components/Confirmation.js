import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    minWidth: 200,
    maxWidth: 350,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
  },
  confirmationButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  b: {
    margin: theme.spacing(1),
  },
}));

export default function TransitionsModal({
  msg,
  switchOpen,
  open,
  handleDelete,
  id,
}) {
  const classes = useStyles();
  const onDelete = (id) => {
    handleDelete(id);
  };

  const handleClose = () => {
    switchOpen(false);
  };

  return (
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
            <h2 id="transition-modal-title">Confirmation</h2>
            <p id="transition-modal-description">{msg}</p>
            <div className={classes.confirmationButton}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.b}
                onClick={() => onDelete(id)}
              >
                Yes
              </Button>
              <Button size="small" className={classes.b} onClick={handleClose}>
                No
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
