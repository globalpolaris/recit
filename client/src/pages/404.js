import React from "react";
import Headers from "../components/Headers";
import FetchUser from "../adapters/FetchUser";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  text: {
    textDecoration: "none",
  },
}));

export default function NotFound() {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    async function getUser() {
      const data = await FetchUser();
      if (data.status === 200) {
        setIsLoggedIn(data.data.isLoggedIn);
        setUsername(data.data.username);
      } else {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
      }
    }
    getUser();
  }, []);

  return (
    <div>
      <Headers username={username} isLoggedIn={isLoggedIn} />
      <h1 style={{ textAlign: "center" }}>
        Oops, the page you're looking for is not here!
      </h1>
      <Typography style={{ textAlign: "center" }}>
        <Link to="/" className={classes.text}>
          Return to Home
        </Link>
      </Typography>
    </div>
  );
}
