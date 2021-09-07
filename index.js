require("dotenv").config();
const express = require("express");
const journalRouter = require("./routers/journal");
const userRouter = require("./routers/users");
const path = require("path");
const cors = require("cors");
const { MONGODB_CONNECTION_STRING } = process.env;

const app = express();
const port = process.env.PORT || 3002;

//GET, PUT, POST, DELETE
const corsOptions = {
  origin: "http://localhost:3000",
};

const mongoose = require("mongoose");
mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("Failed to connect to database");
});

db.once("open", () => {
  console.log("Successfully connected to database");
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static("public"));
app.set("view engine", "ejs");
app.use(journalRouter);
app.use(userRouter);

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// app.get('/', (req, res) => {
//   const responseText = `Requested at: ${req.myDate.toString()}`;
//   res.render('./pages/index', { responseText: responseText });
// });

app.listen(port, () => console.log(`Listening on ${port}`));
