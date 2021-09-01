const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.set("useFindAndModify", false);
mongoose.set("returnOriginal", false);
const anonJournalSchema = new Schema(
  {
    body: String,
  },
  { timestamps: true }
);

const AnonJournal = mongoose.model("AnonJournal", anonJournalSchema);

module.exports = AnonJournal;
