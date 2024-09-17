const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User has been created successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    // Send response with token and user details
    res.status(200).json({
      success: true,
      token,
      user: {
        userName: user.userName,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot access this user information",
      });
    }

    const user = await User.findById(id)
      .populate({
        path: "sentFriendRequests",
        select: "_id",
      })
      .populate({
        path: "friendRequests",
        select: "_id userName email",
      })
      .exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        userName: user.userName,
        email: user.email,
        id: user._id,
        sentFriendRequests: user.sentFriendRequests,
        friends: user.friends,
        friendRequests: user.friendRequests,
      },
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
  registerUser,
  login,
  getUserById,
};
