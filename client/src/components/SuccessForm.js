import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function SuccessForm() {
  const styles = useStyles();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }, []);
  return (
    <Container className={styles.container}>
      <div className={styles.root}>
        <Alert severity="success">
          <AlertTitle>Registration success!</AlertTitle>
          You can now login with your username and password
        </Alert>
        <br />
        <em>
          You will be redirected in <strong>3</strong> seconds.
        </em>
      </div>
    </Container>
  );
}
