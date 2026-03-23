import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      unique: true,
      sparse: true,
      default: null,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      default: null,
    },
    backstory: {
      type: String,
      trim: true,
      maxlength: [500, "Backstory cannot exceed 500 characters."],
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    expertise: {
      type: [String],
      default: [],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address.",
      ],
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: function () {
        return !this.clerkId;
      },
      minlength: [8, "Password must be at least 8 characters."],
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
      default: null,
    },
    passwordResetToken: {
      type: String,
      select: false,
      default: null,
    },
    passwordResetExpiresAt: {
      type: Date,
      select: false,
      default: null,
    },
    emailVerificationToken: {
      type: String,
      select: false,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
    deactivatedAt: {
      type: Date,
      default: null,
    },
    ideasCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    votesCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    connections: [{
      type: String
    }],
    savedIdeas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea"
    }]
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.methods.toPublicJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  delete user.passwordResetToken;
  delete user.passwordResetExpiresAt;
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
