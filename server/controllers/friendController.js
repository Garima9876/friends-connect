const User = require("../models/User");

// Send Friend Request API
const sendFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      user.friendRequests.includes(friendId) ||
      user.friends.includes(friendId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Friend request already sent or user is already a friend",
      });
    }

    friend.friendRequests.push(userId);
    await friend.save();

    res.status(200).json({
      success: true,
      message: "Friend request sent successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Accept Friend Request API
const acceptFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({
        success: false,
        message: "No friend request found",
      });
    }

    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== friendId
    );
    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.status(200).json({
      success: true,
      message: "Friend request accepted",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Decline Friend Request API
const declineFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== friendId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: "Friend request declined",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Friends List API
const getFriendsList = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate(
      "friends",
      "userName email"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      friends: user.friends,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Remove Friend API
const removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.status(200).json({
      success: true,
      message: "Friend removed successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendsList,
  removeFriend,
};
