const express = require("express");
const {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendsList,
  removeFriend,
} = require("../controllers/friendController");

const router = express.Router();

router.post("/friend-request", sendFriendRequest);
router.post("/friend-request/accept", acceptFriendRequest);
router.post("/friend-request/decline", declineFriendRequest);
router.get("/friends/:userId", getFriendsList);
router.post("/friends/remove", removeFriend);

module.exports = router;
