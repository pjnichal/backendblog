import { BlogPost } from "../models/blogpostmodel.js";
import crypto from "crypto";
export const postvalidator = (req, res, next) => {
  var blogPost = new BlogPost();
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
