import mongoose from "mongoose";

const blogPost = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  user: { required: true, type: String },
  time: { type: Date, default: Date.now },
});
blogPost.index({ "$**": "text" });
const BlogPost = mongoose.model("BlogPost", blogPost);

export { BlogPost };
