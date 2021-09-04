const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authJwt");
const journalController = require("../controllers/journalController");

router
  .route("/api/journals")
  .get(verifyToken, journalController.index)
  .post(verifyToken, journalController.createJournal);

router.get("/api/journals/:id", journalController.journalDetail);
router.put("/api/journals/:id", verifyToken, journalController.updateJournal);
router.delete(
  "/api/journals/:id",
  verifyToken,
  journalController.deleteJournal
);

router.post("/api/anon-journals", journalController.createAnonJournal);

module.exports = router;
