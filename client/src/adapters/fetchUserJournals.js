import instance from "./AxiosInstance";

const FetchUserJournal = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }
  try {
    const response = await instance.get(`journals`, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.status;
  }
};

export default FetchUserJournal;
