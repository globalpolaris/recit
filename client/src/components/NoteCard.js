import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  body: {
    wordWrap: "break-word",
  },
}));

export default function NoteCard({ props }) {
  const classes = useStyles();
  return (
    <div>
      <Card>
        <CardHeader
          action={
            <div>
              <IconButton>
                <DeleteIcon />
              </IconButton>{" "}
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
