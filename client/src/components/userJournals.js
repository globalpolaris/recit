import React from "react";
import FetchUserJournal from "../adapters/fetchUserJournals";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import NoteCard from "./NoteCard";
import Snackbar from "./Snackbar";

export default function UserJournals() {
  const [journals, setJournals] = React.useState([]);
  const [values, setValues] = React.useState("");
  const [open, setOpen] = React.useState(false);
  console.log("jor", journals);

  const changeOpen = () => {
    setOpen(true);
  };

  const handleChange = (v) => {
    setValues(v);
    setJournals([]);
    console.log("update", journals);
  };

  React.useEffect(() => {
    const fetchJournal = async () => {
      let response = FetchUserJournal()
        .catch((error) => console.log(error))
        .then((data) => {
          console.log("fetch: ", data);
          if (data.length !== 0)
            setJournals((journal) => [...journal, ...data]);
        });
    };
    fetchJournal();
  }, [values]);
  return (
    <Container>
      {open && <Snackbar state={open} msg="Note has been deleted!" />}
      <Grid container spacing={3}>
        {journals.length === 0 ? (
          <h2>You dont have any journals</h2>
        ) : (
          journals.map((journal) => (
            <Grid item key={journal._id} xs={12} md={6} lg={4}>
              <NoteCard
                props={journal}
                changeValue={handleChange}
                changeOpen={changeOpen}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
