import instance from "../adapters/AxiosInstance";

const FetchUser = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await instance.get(`user`, {
      headers: {
        "x-access-token": token,
      },
    });
    const data = await response;
    JSON.stringify("data");
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export default FetchUser;
