const mongoose = require("mongoose");
const { Schema } = mongoose;

const blacklistTokenSchema = new Schema(
  {
    token: String,
  },
  { timestamps: true }
);

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

module.exports = BlacklistToken;
