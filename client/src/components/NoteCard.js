import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardHeader, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteNote from "../adapters/DeleteNoteHandler";
import EditNote from "./EditNoteModal";
import Confirmation from "./Confirmation";

const useStyles = makeStyles((theme) => ({
  body: {
    wordWrap: "break-word",
  },
  button: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function NoteCard({ props, changeValue, changeOpen }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const switchOpen = (condition) => {
    setOpen(condition);
  };

  const handleDelete = async (id) => {
    try {
      let response = await DeleteNote(id);
      if (response === 200) {
        changeOpen();
        changeValue(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {open && (
        <Confirmation
          msg={"Are you sure?"}
          switchOpen={switchOpen}
          open={open}
          handleDelete={handleDelete}
          id={props._id}
        />
      )}
      <Card>
        <CardHeader
          action={
            <div className={classes.button}>
              <IconButton onClick={() => switchOpen(true)}>
                <DeleteIcon />
              </IconButton>
              <EditNote title={props.title} body={props.body} id={props._id} />
            </div>
          }
          title={props.title}
          subheader={props.updated_at}
        />
        <CardContent className={classes.body}>
          <Typography variant="body2">{props.body}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
