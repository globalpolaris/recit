import React from "react";
import FetchUserJournal from "../adapters/fetchUserJournals";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import NoteCard from "./NoteCard";

export default function UserJournals(props) {
  const [journals, setJournals] = React.useState([]);
  const { isLoggedIn } = props;
  console.log("is logein ???", isLoggedIn);

  React.useEffect(() => {
    async function fetchJournal(props) {
      const data = await FetchUserJournal();
      console.log(data);
      if (data) setJournals((journal) => [...journal, ...data]);
    }

    console.log(
      "Jor",
      journals.map((jour) => console.log(jour.title))
    );
    fetchJournal();
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {journals.length === 0 ? (
          <h2>You dont have any journals</h2>
        ) : (
          journals.map((journal) => (
            <Grid item key={journal._id} xs={12} md={6} lg={4}>
              <NoteCard props={journal} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
