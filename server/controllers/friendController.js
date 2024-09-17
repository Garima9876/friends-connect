const User = require("../models/User");

// User Search API
const searchUsers = async (req, res) => {
  const { query } = req.query;
  const userId = req.user?.id;

  try {
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found",
      });
    }

    // Search users by userName or email, excluding the current user
    const users = await User.find({
      _id: { $ne: userId }, // Exclude current user
      $or: [
        { userName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).select("userName email");

    // Check if the query matches the current user
    const currentUser = await User.findById(userId).select("userName email");
    if (currentUser && (currentUser.userName.includes(query) || currentUser.email.includes(query))) {
      return res.status(200).json({
        success: true,
        message: "You cannot search for yourself.",
        users: [],
      });
    }

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Send Friend Request API
const sendFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    if (userId === friendId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a friend request to yourself",
      });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if a friend request was already sent or they are already friends
    if (
      user.sentFriendRequests.includes(friendId) ||
      user.friends.includes(friendId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Friend request already sent or user is already a friend",
      });
    }

    // Add friend request to friend's friendRequests and user's sentFriendRequests
    friend.friendRequests.push(userId);
    user.sentFriendRequests.push(friendId);

    await user.save();
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

    // Remove the userId from the friend's sentFriendRequests
    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (id) => id.toString() !== userId
    );

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
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({
        success: false,
        message: "User or friend not found",
      });
    }

    // Remove the friendId from the user's friendRequests
    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== friendId
    );

    // Remove the userId from the friend's sentFriendRequests
    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (id) => id.toString() !== userId
    );

    await user.save();
    await friend.save();

    res.status(200).json({
      success: true,
      message: "Friend request declined and sender notified",
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

    // Remove the userId from the friend's sentFriendRequests
    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (id) => id.toString() !== userId
    );

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

// Recommended Users API
const getRecommendedUsers = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("friends friendRequests");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find users who are not friends or pending friend requests
    const recommendedUsers = await User.find({
      _id: { $nin: [...user.friends, ...user.friendRequests, userId] },
    }).select("userName email");

    res.status(200).json({
      success: true,
      recommendedUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendsList,
  removeFriend,
  getRecommendedUsers,
};
