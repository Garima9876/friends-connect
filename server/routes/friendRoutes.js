// routes/friendRoutes.js
const express = require("express");
const {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendsList,
  removeFriend,
  getRecommendedUsers,
} = require("../controllers/friendController");
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/search", authenticate, searchUsers);
router.post("/friend-request", authenticate, sendFriendRequest);
router.post("/friend-request/accept", authenticate, acceptFriendRequest);
router.post("/friend-request/decline", authenticate, declineFriendRequest);
router.get("/:userId", authenticate, getFriendsList);
router.post("/remove", authenticate, removeFriend);
router.get("/:userId/recommended", authenticate, getRecommendedUsers);

module.exports = router;
