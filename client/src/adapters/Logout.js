import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import instance from "./AxiosInstance";

const WaitLogout = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await instance.post(`/user/logout`, {
      token: token,
    });

    const data = await response;
    return data;
  } catch (err) {
    console.error(err);
    return err.response;
  }
};

const Logout = () => {
  const history = useHistory();
  const [isLoggedOut, setIsLoggedOut] = React.useState(false);
  React.useEffect(() => {
    async function logoutUser() {
      const data = await WaitLogout();
      if (data.status === 201) {
        localStorage.removeItem("accessToken");

        history.push("/");
      }
    }
    logoutUser();
  }, []);

  return <>a</>;
};

export default Logout;
