const User = require('../models/user');

const checkUsername = async (username) => {
  const query = User.findOne({ username: username }, (err, user) => {
    if (err) res.status(500).send({ message: err });
    return user;
  });
  const result = await query;
  return result;
};

const checkEmail = async (email) => {
  const query = User.findOne({ email: email }, (err, user) => {
    if (err) res.status(500).send({ message: err });
    return user;
  });
  const result = await query;
  return result;
};

module.exports = { checkUsername, checkEmail };
