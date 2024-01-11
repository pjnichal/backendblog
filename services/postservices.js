import { BlogPost } from "../models/blogpost.js";
//Get All Posts
export const getAllBlogPostsService = () => {
  return new Promise(async (resolve, reject) => {
    const allblogPosts = await BlogPost.find();
    if (allblogPosts.length > 0) {
      return resolve({
        status: 200,
        code: "POSTS",
        message: "Posts fetched successfully",
        data: allblogPosts,
      });
    } else {
      return reject({
        status: 404,
        code: "POSTF",
        message: "Posts not found",
      });
    }
  });
};
export const getMostPopular = () => {
  return new Promise(async (resolve, reject) => {
    const allblogPosts = await BlogPost.find();
    if (allblogPosts.length > 0) {
      return resolve({
        status: 200,
        code: "POSTS",
        message: "Posts fetched successfully",
        data: allblogPosts,
      });
    } else {
      return reject({
        status: 404,
        code: "POSTF",
        message: "Posts not found",
      });
    }
  });
};
//Get by id
export const getBlogPostByIdService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blogPost = await BlogPost.findOne({ _id: id });
      if (blogPost != null) {
        return resolve({
          status: 200,
          code: "POSTS",
          message: "Posts fetched successfully",
          data: blogPost,
        });
      } else {
        return reject({
          status: 404,
          code: "POSTF",
          message: "Post not found",
        });
      }
    } catch (error) {
      reject({
        status: 404,
        code: "POSTF",
        message: "Post not found",
      });
    }
  });
};
export const getByText = async (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("called");
      const blogPost = await BlogPost.find({ $text: { $search: text } });
      if (blogPost != null) {
        return resolve({
          status: 200,
          code: "POSTS",
          message: "Posts fetched successfully",
          data: blogPost,
        });
      } else {
        return reject({
          status: 404,
          code: "POSTF",
          message: "Post not found",
        });
      }
    } catch (error) {
      reject({
        status: 404,
        code: "POSTF",
        message: "Post not found",
      });
    }
  });
};
export const deleteBlogPostService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allblogPosts = await BlogPost.deleteOne({ _id: id });
      if (allblogPosts.deletedCount > 0) {
        return resolve({
          status: 201,
          code: "POSTDS",
          message: "Post deleted successfully",
        });
      }
      return reject({
        status: 404,
        code: "POSTDF",
        message: "Post not found",
      });
    } catch (error) {
      return reject({
        status: 404,
        code: "POSTDF",
        message: "Post delete fauled",
      });
    }
  });
};
//save blog post
export const saveBlogPostService = (blogPost) => {
  return new Promise(async (resolve, reject) => {
    console.log(blogPost);
    try {
      const post = BlogPost({ ...blogPost });
      await post.save();
      return resolve({
        status: 200,
        code: "POSTSS",
        message: "Post saved successfully",
        data: post,
      });
    } catch (error) {
      return reject({
        status: 500,
        code: "POSTSF",
        message: "Post not saved",
      });
    }
  });
};
//update the blog post
export const updateBlogPostService = (id, blogpost) => {
  return new Promise(async (resolve, reject) => {
    const updatedItem = await BlogPost.findByIdAndUpdate(id, blogpost, {
      new: true,
    });

    if (updatedItem) {
      return resolve({
        status: 200,
        code: "POSTUS",
        message: "Posts fetched successfully",
        data: updatedItem,
      });
    } else {
      return reject({
        status: 401,
        code: "POSTUF",
        message: "Post Update failed",
      });
    }
  });
};
