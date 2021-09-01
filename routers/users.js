const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");
const { verifyToken } = require("../middleware/authJwt");

router.get("/api/user", verifyToken, userController.index);
router.post("/api/user/register", userController.registerUser);
router.post("/api/user/login", userController.login);
router.post("/api/user/logout", tokenController.logout);

module.exports = router;
