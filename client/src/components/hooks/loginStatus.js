import React, { useState } from "react";
import instance from "../../adapters/AxiosInstance";

const LoginStatus = async () => {
  const token = localStorage.getItem("accessToken");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (!token) return username, isLoggedIn;
  try {
    const res = await instance.get(`/user`, {
      headers: {
        "x-access-token": token,
      },
    });
    const data = await res;
    JSON.stringify(data);
    if (res.status === 200) {
      setIsLoggedIn(data.data.isLoggedIn);
      setUsername(data.data.username);
      console.log("YES?", isLoggedIn, username);
    }
  } catch (e) {
    console.error(e);
  }
  return { isLoggedIn, username };
};

export default LoginStatus;
