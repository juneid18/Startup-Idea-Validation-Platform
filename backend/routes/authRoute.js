import express from "express";
const router = express.Router();
import {
  Login,
  Register,
  Logout,
  ForgotPassword,
  ResetPassword,
  syncClerkUser,
  updateProfile,
  getAllUsers,
  toggleConnection,
} from "../controller/authController.js";

router.post("/login", Login);
router.post("/register", Register);
router.post("/sync-clerk", syncClerkUser);
router.post("/forgot-password", ForgotPassword);
router.post("/logout", Logout);
router.post("/reset-password/:token", ResetPassword);
router.post("/update-profile", updateProfile);
router.get("/users", getAllUsers);
router.post("/connect", toggleConnection);

export default router;
