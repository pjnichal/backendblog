import mongoose, { Schema } from "mongoose";

const user = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
});

const User = mongoose.model("User", user);

export { User };
