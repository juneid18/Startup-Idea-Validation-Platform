const isProd = process.env.NODE_ENV === "production";
const _base = (typeof window !== "undefined" ? window.location.origin : "") || process.env.FRONTEND_URL || "http://localhost:3000";

export const REDIRECT_AFTER_LOGIN = `${_base}/explore`;
export const REDIRECT_AFTER_SIGNUP = `${_base}/explore`;

export const OAUTH_PROVIDERS = [
  { id: "google", label: "Google", icon: "google" },
  { id: "github", label: "GitHub", icon: "github" },
];

export const VALIDATION = {
  NAME: { MIN: 2 },
  PASSWORD: { MIN: 8 },
};

export const ERROR_MESSAGES = {
  name: "Name must be at least 2 characters.",
  email: "Please enter a valid email address.",
  password: "Password must be at least 8 characters.",
  confirmPassword: "Passwords do not match.",
  loginFailed: "Invalid email or password. Please try again.",
  signupFailed: "Something went wrong. Please try again.",
  emailExists: "An account with this email already exists.",
};

export const BRAND = {
  name: "IdeaProof",
  tagline: "Where startup ideas get validated.",
};