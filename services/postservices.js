import {BlogPost} from "../models/blogpost.js";
//Get All Posts
export const getAllBlogPostsService = () => {
  return new Promise((resolve, reject) => {
    const allblogPosts = BlogPost.find();
    console.log(allblogPosts);
    return reject();
  });
};
//Get by id
export const getBlogPostByIdService = (id) => {
  return new Promise((resolve, reject) => {
    
  });
};
export const deleteBlogPostService = (id) => {
  return new Promise((resolve, reject) => {
   
  });
};
//save blog post
export const saveBlogPostService = (blogPost) => {
  return new Promise((resolve, reject) => {
    console.log(blogPost)
   const post = BlogPost({...blogPost});
   post.save();
   
   resolve(post);
   
  });
};
//update the blog post
export const updateBlogPostService = (blogpost) => {
  return new Promise((resolve, reject) => {
  
  });
};
