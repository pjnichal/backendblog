import { BlogPost } from "../models/blogpostmodel.js";
import crypto from "crypto";
export const postvalitor = (req, res, next) => {
  console.log("MiddleWareCalled");
  var blogPost = new BlogPost();
  blogPost.title = req.body.title;
  console.log(req.originalUrl);
  if (req.originalUrl == "/blogpost/update") {
    console.log("HERE");
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
