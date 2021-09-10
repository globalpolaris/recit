import React from "react";
import Headers from "../components/Headers";
import AnonForm from "../components/AnonForm";
import FetchUser from "../adapters/FetchUser";

const Home = () => {
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
    <React.Fragment>
      <Headers username={username} isLoggedIn={isLoggedIn} />
      <AnonForm />
    </React.Fragment>
  );
};

export default Home;
