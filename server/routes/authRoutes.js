const express = require("express");
const { registerUser, login, getUserById } = require("../controllers/authController");
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/user/:id", authenticate, getUserById);

module.exports = router;
