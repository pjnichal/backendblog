import { BlogPost } from "../models/blogpostmodel.js";

export const postvalitor = (req, res, next) => {
  console.log("MiddleWareCalled");
  var blogPost = new BlogPost();
    blogPost.author=req.body.author;
    blogPost.content=req.
  next(res, blogPost);
};
