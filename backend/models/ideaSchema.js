import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Make false for easier testing initially
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    targetAudience: {
      type: String,
      required: true,
    },
    validationScore: {
      type: Number,
      default: 0,
    },
    analysisResult: {
      type: Object,
      default: {},
    },
    views: {
      type: Number,
      default: Math.floor(Math.random() * 500),
    },
    saves: {
      type: Number,
      default: Math.floor(Math.random() * 50),
    },
    upvotedBy: {
      type: [String],
      default: []
    },
    downvotedBy: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Idea = mongoose.model("Idea", ideaSchema);
export default Idea;
