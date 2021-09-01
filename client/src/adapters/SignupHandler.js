import instance from "./AxiosInstance";

const SignupHandler =async (user) => {
  try {
    const data = await instance.post(`user/register`, {
      username: user.username,
      email: user.email,
      password: user.password,
    });
    return data.status
  } catch (error) {
    return error.response.status
  }
};

export default SignupHandler;
