const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const { Schema } = mongoose;
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Please enter username',
    },
    email: {
      type: String,
      required: 'Please enter your email.',
      trime: true,
      unique: true,
    },
    password: {
      type: String,
      required: 'Please enter your password.',
    },
    stories: {
      type: Schema.Types.ObjectId,
      ref: 'Journal'
    }
  },
  { timestamps: true }
);


const User = mongoose.model('User', userSchema);

module.exports = User;
