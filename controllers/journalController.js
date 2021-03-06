const { nanoid } = require("nanoid");
const Journal = require("../models/journal");
const AnonJournal = require("../models/anonJournal");

const index = (req, res) => {
  console.log(req.username);
  Journal.find({ author: req.userId }, (err, data) => {
    if (typeof data === "undefined") {
      res.status(404).send({ message: "You haven't wrote any journals." });
      return;
    }
    if (err) {
      res.status(500).send({ message: "Internal server error" });
      return;
    }
    return res.status(200).json(data);
  });
};

const journalDetail = (req, res) => {
  id = req.params.id;
  Journal.findById(id, (err, document) => {
    if (typeof document === "undefined") {
      return res.status(404).send("Journal not found");
    }
    return res.status(200).json(document);
  });
};

const createJournal = (req, res) => {
  let jkt = new Date();

  const journal = new Journal({
    title: req.body.title,
    author: req.userId,
    body: req.body.body,
    created_at: jkt.toLocaleString("en-GB"),
    updated_at: jkt.toLocaleString("en-GB"),
  });
  journal.save((err, result) => {
    if (err) console.log(err);
    console.log(result);
    return res.status(201).send({ message: "New story created!" });
  });
};

const createAnonJournal = (req, res) => {
  const journal = new AnonJournal({
    body: req.body.body,
  });
  journal.save((err, result) => {
    if (err) console.log(err);
    console.log(result);
    return res.status(201).send({ message: "Story saved!" });
  });
};

const updateJournal = (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  let jkt = new Date();
  Journal.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      body: req.body.body,
      updated_at: jkt.toLocaleString("en-GB"),
    },
    (err, document) => {
      if (userId != document.author) {
        return res.status(403).send("Not authorized!");
      }
      if (err)
        return res
          .status(404)
          .send("Couldn't find the journal you're looking for :(");
      return res.status(200).send({ message: "Journal has been updated!" });
    }
  );
};

const deleteJournal = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  const journal = await Journal.findById(id, (err, data) => {
    if (err) err;
    return data;
  });
  if (journal) {
    if (journal.author == userId) {
      Journal.findByIdAndDelete(id, (err, data) => {
        if (err) res.status(400).send("Failed to delete journal");
        return res.status(200).send(`Journal has been deleted ${data}`);
      });
    } else return res.status(404).send("Not authorized! :(");
  } else {
    return res.status(404).send("Journal not found!");
  }
};

module.exports = {
  index,
  journalDetail,
  createJournal,
  updateJournal,
  deleteJournal,
  createAnonJournal,
};
