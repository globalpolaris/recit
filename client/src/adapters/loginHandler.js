import instance from "./AxiosInstance";
import { useHistory } from "react-router";

const LoginHandler = async (user) => {
  try {
    const response = await instance.post(`user/login`, {
      username: user.username,
      password: user.password,
    });
    let data = await response;
    JSON.stringify(data);
    if (response.status === 200) {
      const isToken = localStorage.getItem("accessToken");
      if (isToken) localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", data.data.accessToken);
      window.location = "/journals";
    }
  } catch (error) {
    return error.response.status;
  }
};

export default LoginHandler;
