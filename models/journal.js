const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('useFindAndModify', false);
mongoose.set('returnOriginal', false);
const journalSchema = new Schema(
  {
    title: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    body: String,
  },
  { timestamps: true }
);

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
