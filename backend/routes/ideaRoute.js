import express from "express";
import { createAndAnalyzeIdea, getIdeas, getDashboardAnalytics, upvoteIdea, downvoteIdea, toggleSaveIdea, getSavedIdeas } from "../controller/ideaController.js";

const router = express.Router();

router.post("/analyze", createAndAnalyzeIdea);
router.get("/all", getIdeas);
router.get("/analytics", getDashboardAnalytics);
router.put("/:id/upvote", upvoteIdea);
router.put("/:id/downvote", downvoteIdea);
router.post("/:id/save", toggleSaveIdea);
router.get("/saved/:userId", getSavedIdeas);

export default router;
