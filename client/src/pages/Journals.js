import React from "react";
import Headers from "../components/Headers";
import FetchUser from "../adapters/FetchUser";
import UserJournals from "../components/userJournals";
import FloatingButton from "../components/FloatingButton";
import { Redirect } from "react-router-dom";

export default function Journals() {
  const [username, setUsername] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  React.useEffect(() => {
    async function getUser() {
      const data = await FetchUser();
      if (data.status === 200) {
        setIsLoggedIn(data.data.isLoggedIn);
        setUsername(data.data.username);
      } else {
        localStorage.removeItem("accessToken");
        window.location = "/login";
      }
    }
    getUser();
  }, []);

  return (
    <React.Fragment>
      <Headers username={username} isLoggedIn={isLoggedIn} />
      <UserJournals isLoggedIn={isLoggedIn} />
      <FloatingButton />
    </React.Fragment>
  );
}
