const mongoose = require('mongoose');
const config = require('../config/auth.config');
const { nanoid } = require('nanoid');

const RefreshTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async (user) => {
  let expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

  let _token = nanoid();
  let _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });

  console.log(_object);

  let refreshToken = await _object.save();
  return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = RefreshToken;
