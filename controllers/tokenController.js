const BlacklistToken = require("../models/blacklistToken");

const logout = (req, res) => {
  const token = req.body.token;
  const blacklistToken = new BlacklistToken({
    token: token,
  });
  blacklistToken.save((err) => {
    if (err) {
      res.status(500).send(err.message);
    }
    return res.status(201).send("Logout success");
  });
};

module.exports = { logout };
