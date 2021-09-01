const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { TokenExpiredError } = jwt;
const BlacklistToken = require("../models/blacklistToken");

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Token expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const checkToken = async (token) => {
  const query = BlacklistToken.findOne({ token: token }, (err, data) => {
    if (err) res.status(500).send(err);

    return data;
  });
  const result = await query;
  return result;
};

const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    console.log("no tokne");
    return res.status(403).send({ message: "No token provided!" });
  }
  const isTokenValid = await checkToken(token);

  if (isTokenValid !== null) {
    return res.status(403).send({ message: "Token Expired" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

module.exports = { verifyToken };
