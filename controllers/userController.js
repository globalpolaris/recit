const User = require("../models/user");

const bcrypt = require("bcryptjs");
const verifyUser = require("../middleware/verifySignup");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

const index = (req, res) => {
  if (req.status === 401) {
    return res.status(401).message({ message: "No Token Provided" });
  }
  const user = {
    isLoggedIn: true,
    username: req.username,
  };
  return res.status(200).json(user);
};

const updateProfileGet = (req, res) => {
  res.send("updateProfile page GET");
};

const updateProfilePost = (req, res) => {
  res.send("updateProfile page POST");
};

const registerUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  if (email === "") {
    res.status(400).send({ message: "Please input your email." });
    return;
  }
  if (username === "") {
    res.status(400).send({ message: "Please input your username" });
    return;
  }
  if (req.body.password === "") {
    res.status(400).send({ message: "Please input your password" });
    return;
  }

  const isUsername = await verifyUser.checkUsername(username);
  const isEmail = await verifyUser.checkEmail(email);

  if (isUsername !== null && isEmail !== null) {
    res.statusMessage = "Invalid username and email";
    res.status(480).send("Username and email are taken");
  } else if (isUsername !== null && isEmail === null) {
    res.statusMessage = "Invalid username";
    res.status(481).send("Username is taken.");
  } else if (isUsername === null && isEmail !== null) {
    res.statusMessage = "Invalid email";
    res.status(482).send("Email is taken.");
  } else {
    const newUser = new User({
      username: username,
      email: email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    newUser.save((err) => {
      if (err) {
        res.status(500).send(err.message);
      }
      return res
        .status(201)
        .send(
          "Registration succeed, you can now login with your username and password"
        );
    });
  }
};

const login = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "invalid Password!",
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: 86400,
      }
    );

    res.status(200).send({
      id: user._id,
      username: user.username,
      accessToken: token,
    });
  });
};

module.exports = {
  index,
  updateProfileGet,
  updateProfilePost,
  registerUser,
  login,
};
