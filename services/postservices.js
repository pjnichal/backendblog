import { client } from "../config/redis.js";
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
export const getByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    const allblogPosts = await BlogPost.find({ user: id });
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
    try {
      const keys = await client.keys("*");
      let popularList = [];
      if (keys.length == 0) {
        return reject({
          status: 404,
          code: "POSTF",
          message: "No Popular Post",
        });
      }
      const values = await client.mget(keys);

      values.map((val) => {
        const data = JSON.parse(val);
        let finalData = data.data;
        finalData["count"] = data.count;
        console.log(data);
        console.log(data);
        if (data.count > 4) {
          popularList.push(finalData);
        }
      });
      if (popularList.length == 0) {
        return reject({
          status: 404,
          code: "POSTF",
          message: "No Popular Post",
        });
      }
      return resolve({
        status: 200,
        code: "POSTS",
        message: "Posts fetched successfully",
        data: popularList,
      });
    } catch (error) {
      return reject({
        status: 404,
        code: "POSTF",
        message: "No Popular Post",
      });
    }
  });
};
//Get by id
export const getBlogPostByIdService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blogPost = await BlogPost.findOne({ _id: id });
      // await client.del(`popular:${id}`);
      if (blogPost != null) {
        try {
          let popular = await client.get(`popular:${id}`);

          console.log(popular);
          if (popular == null) {
            const data = { count: 0, data: {} };
            const stringData = JSON.stringify(data);
            await client.set(`popular:${id}`, stringData);
          } else {
            const jsonData = JSON.parse(popular);
            let count = jsonData.count + 1;
            if (count > 4 && Object.keys(jsonData.data).length == 0) {
              console.log("set called");
              const data = { count: count, data: blogPost };
              const stringData = JSON.stringify(data);
              await client.set(`popular:${id}`, stringData);
            } else {
              const data = { count: count, data: jsonData.data };
              console.log(count);
              const stringData = JSON.stringify(data);
              await client.set(`popular:${id}`, stringData);
            }
          }
        } catch (error) {
          console.log(error);
        }

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
        error: error,
      });
    }
  });
};
export const getByText = async (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("called");
      const blogPost = await BlogPost.find({
        $text: { $search: text },
      });
      console.log(blogPost);
      if (blogPost.length > 0) {
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
        await clienxt.del(`popular:${id}`);
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
      console.log(error);
      if (error.errors["tags"]) {
        error.errors["tags"]["message"] = "`tags` is required.";
      }

      return reject({
        status: 500,
        code: "POSTSF",
        message: "Post not saved",
        validation: error.errors,
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
