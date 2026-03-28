import User from "../models/userSchema.js";

const generateUsername = async (name) => {
  let username;
  let exists = true;
  
  while (exists) {
    username = name.replace(/\s+/g, "").toLowerCase() + Math.floor(Math.random() * 10000);
    const user = await User.findOne({ username });
    exists = !!user;
  }
  
  return username;
};

export default generateUsername;