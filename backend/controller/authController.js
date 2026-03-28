import mongoose from "mongoose";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import { sendEmail } from "../services/sendEmail.js";
import generateUsername from "../helper/generateUsername.js";
dotenv.config();

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Must explicitly select password because it is hidden in schema
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (user.isDeactivated) {
      return res.status(403).json({
        success: false,
        message: "This account has been deactivated. Please contact support.",
      });
    }

    await sendEmail(
      normalizedEmail,
      "New Login Alert",
      `Your account was just accessed. If this wasn't you, please reset your password immediately.`,
    );

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" },
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" },
    );

    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // not accessible via JS
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token: accessToken,
      user: user.toPublicJSON(),
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
const syncClerkUser = async (req, res) => {
  try {
    const { id, email, name, avatar } = req.body;

    let user = await User.findOne({ clerkId: id });

    if (!user) {
      // Check if user already exists with this email (e.g. manual signup earlier)
      user = await User.findOne({ email: email.toLowerCase() });

      if (user) {
        // Link Clerk to existing account
        user.clerkId = id;
        if (avatar && !user.avatarUrl) user.avatarUrl = avatar;
        if (name && !user.name) user.name = name;
        await user.save();
      } else {
        // First time login — create user in your DB
        user = await User.create({
          clerkId: id,
          email: email.toLowerCase(),
          name: name || email.split("@")[0],
          avatarUrl: avatar || null,
          username:
            (name
              ? name.replace(/\s+/g, "").toLowerCase()
              : email.split("@")[0]) + Math.floor(Math.random() * 1000),
          isEmailVerified: true,
        });
      }
    }

    return res.status(200).json({
      success: true,
      user: user.toPublicJSON(),
    });
  } catch (err) {
    console.error("Clerk sync error:", err);
    return res.status(500).json({ success: false, message: "Sync failed." });
  }
};
const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });
    if (existingUser) {
      const field =
        existingUser.email === normalizedEmail ? "email" : "username";
      return res.status(409).json({
        success: false,
        message: `An account with this ${field} already exists.`,
      });
    }

    // Generate unique username if not provided
    const username = await generateUsername(name);
    const newUser = await User.create({
      username,
      name,
      email: normalizedEmail,
      password, // Password will be hashed by pre-save hook in userSchema
    });

    await sendEmail(
      normalizedEmail,
      "Welcome to Our App",
      "Thank you for signing up!",
    );

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user: newUser.toPublicJSON(),
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const Logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      // Clear refresh token from DB
      await User.findOneAndUpdate(
        { refreshToken: token },
        { refreshToken: null },
      );
    }

    // Clear the cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findByEmail(normalizedEmail);
    const GENERIC_RESPONSE = {
      success: true,
      message:
        "If an account with that email exists, a reset link has been sent.",
    };
    if (!user || user.isDeactivated) {
      return res.status(200).json(GENERIC_RESPONSE);
    }
    const COOLDOWN_MINUTES = 5;
    if (user.passwordResetExpiresAt) {
      const tokenAge =
        Date.now() - (user.passwordResetExpiresAt - 60 * 60 * 1000);
      const minutesSinceRequest = tokenAge / 1000 / 60;

      if (minutesSinceRequest < COOLDOWN_MINUTES) {
        return res.status(429).json({
          success: false,
          message: `Please wait ${COOLDOWN_MINUTES} minutes before requesting another reset link.`,
        });
      }
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}&email=${normalizedEmail}`;
    await sendEmail(
      normalizedEmail,
      "Password Reset Request",
      `You requested a password reset. Click the link to reset your password: ${resetURL}\n\nIf you didn't request this, please ignore this email.`,
    );
    return res.status(200).json(GENERIC_RESPONSE);
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Server error during password reset" });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      passwordResetToken: hashedToken,
      passwordResetExpiresAt: { $gt: new Date() }, // not expired
    }).select("+password +passwordResetToken +passwordResetExpiresAt");
    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Reset link is invalid or has expired. Please request a new one.",
      });
    }

    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as your current password.",
      });
    }

    user.password = newPassword;
    user.passwordResetToken = null;
    user.passwordResetExpiresAt = null;
    user.refreshToken = null;
    await user.save();

    await sendEmail(
      email.trim().toLowerCase(),
      "Password Reset Successful",
      "Your password has been reset successfully. If you didn't do this, please contact support immediately.",
    );

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ message: "Server error during password reset" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { email, clerkId, name, backstory, location, expertise } = req.body;

    // Find user by email (primary) or clerkId
    let user = null;
    if (email) user = await User.findByEmail(email);
    else if (clerkId) user = await User.findOne({ clerkId });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Update fields if provided
    if (name !== undefined) user.name = name;
    if (backstory !== undefined) user.backstory = backstory;
    if (location !== undefined) user.location = location;
    if (expertise !== undefined) user.expertise = expertise;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: user.toPublicJSON(),
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error during profile update" });
  }
};

const getUserProfile = (req, res) => {
  res.send("User profile data");
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error fetching users" });
  }
};

const toggleConnection = async (req, res) => {
  try {
    const { userId, targetId } = req.body;
    if (!userId || !targetId)
      return res.status(400).json({ success: false, message: "Missing IDs" });

    let user = await User.findOne({ clerkId: userId });
    if (!user) user = await User.findById(userId); // Fallback

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Handle string IDs regardless of mongoose ObjectIds
    const strTargetId = targetId.toString();

    let connected = false;
    if (user.connections.includes(strTargetId)) {
      user.connections = user.connections.filter((col) => col !== strTargetId);
    } else {
      user.connections.push(strTargetId);
      connected = true;
    }
    await user.save();

    res
      .status(200)
      .json({ success: true, connected, connections: user.connections });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error handling connection" });
  }
};

export {
  Login,
  Register,
  Logout,
  ForgotPassword,
  ResetPassword,
  syncClerkUser,
  getUserProfile,
  updateProfile,
  getAllUsers,
  toggleConnection,
};
