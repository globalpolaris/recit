import instance from "./AxiosInstance";

const NewJournalHandler = async (journal, token) => {
  try {
    const response = await instance.post(
      `/journals`,
      {
        title: journal.title,
        body: journal.body,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export default NewJournalHandler;
