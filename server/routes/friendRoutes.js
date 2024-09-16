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

const router = express.Router();

router.get("/search", searchUsers);
router.post("/friend-request", sendFriendRequest);
router.post("/friend-request/accept", acceptFriendRequest);
router.post("/friend-request/decline", declineFriendRequest);
router.get("/:userId", getFriendsList);
router.post("/remove", removeFriend);
router.get("/:userId/recommended", getRecommendedUsers);

module.exports = router;
