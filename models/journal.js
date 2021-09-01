const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment-timezone");
mongoose.set("useFindAndModify", false);
mongoose.set("returnOriginal", false);
const journalSchema = new Schema(
  {
    title: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    body: String,
    created_at: { type: String },
    updated_at: { type: String },
  },
  {
    timestamp: false,
  }
);

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
