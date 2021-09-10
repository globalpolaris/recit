const axios = require("axios").default;

console.log(process.env.PORT);
const baseUrl = process.env.baseURL || "http://localhost:3002";
const instance = axios.create({
  baseURL: `https://recit-note-app.herokuapp.com/api/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default instance;
