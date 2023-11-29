import { BlogPost } from "../models/blogpostmodel.js";
import crypto from "crypto";
export const postvalidator = (req, res, next) => {
  var blogPost = new BlogPost();
  var validationErrors = {};
  if (req.body.title == undefined) {
    validationErrors["title"] = "Please Add Title";
  }
  if (req.body.author == undefined) {
    validationErrors["author"] = "Please Add Author";
  }
  if (req.body.content == undefined) {
    validationErrors["content"] = "Please Add Content";
  }
  if (req.originalUrl == "/blogpost/update" && req.body.id == undefined) {
    validationErrors["id"] = "Please Add Id";
  }

  if (Object.keys(validationErrors) != 0) {
    return res.status(403).json({
      status: 403,
      message: "Validation Error",
      error: validationErrors,
    });
  }

  blogPost.title = req.body.title;

  if (req.originalUrl == "/blogpost/update") {
    blogPost.id = req.body.id;
  } else {
    blogPost.id = crypto.randomUUID();
  }
  blogPost.author = req.body.author;
  blogPost.content = req.body.content;

  blogPost.timestamp = Date.now();
  res.locals.blogpost = blogPost;
  next();
};
