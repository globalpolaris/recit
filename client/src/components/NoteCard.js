import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardHeader, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DeleteNote from "../adapters/DeleteNoteHandler";

const useStyles = makeStyles((theme) => ({
  body: {
    wordWrap: "break-word",
  },
}));

export default function NoteCard({ props, changeValue, changeOpen }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");

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
      <Card>
        <CardHeader
          action={
            <div>
              <IconButton onClick={() => handleDelete(props._id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton>
                <EditIcon />
              </IconButton>
            </div>
          }
          title={props.title}
          subheader={props.created_at}
        />
        <CardContent className={classes.body}>
          <Typography variant="body2">{props.body}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
