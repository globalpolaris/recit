const axios = require("axios").default;

const instance = axios.create({
  baseURL: `https://recit-note-app.herokuapp.com:${process.env.PORT}/api/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default instance;
