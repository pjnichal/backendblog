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
  return new Promise(async (resolve, reject) => {
    console.log(blogPost)
    try {
      const post = BlogPost({...blogPost});
      console.log("SAVING");
       await post.save();
       console.log("RUNNIGN");
      return resolve(post);
    } catch (error) {
      console.log("ERROR")
      console.log(error);
      resolve(error);
    }
  
   
  
   
  });
};
//update the blog post
export const updateBlogPostService = (blogpost) => {
  return new Promise((resolve, reject) => {
  
  });
};
