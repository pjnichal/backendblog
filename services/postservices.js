import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var filepath = path.join(__dirname, "..", "jsondatastore/blogpost.json");
//Get All Posts
export const getAllBlogPostsService = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf8", function (err, data) {
      if (err && err.code == "ENOENT") {
        return resolve(undefined);
      }
      const jsonData = JSON.parse(data);
      return resolve(jsonData);
    });
  });
};
//Get by id
export const getBlogPostByIdService = (id) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, function (err, data) {
      if (err && err.code == "ENOENT") {
        return resolve(undefined);
      }
      var blogposts = JSON.parse(data);
      var blogpost = blogposts[id];
      if (data.length == 0 || blogpost == undefined) {
        return resolve(undefined);
      }
      return resolve(blogpost);
    });
  });
};
export const deleteBlogPostService = (id) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, function (err, data) {
      if (err && err.code == "ENOENT") {
        return resolve(undefined);
      }
      data = JSON.parse(data);
      var blogpost = data[id];

      if (blogpost == undefined) {
        return resolve(undefined);
      }
      delete data[blogpost.id];
      if (Object.keys(data).length == 0) {
        fs.unlinkSync(filepath);
      } else {
        fs.writeFile(filepath, JSON.stringify(data), (err) => {});
      }
      return resolve(blogpost);
    });
  });
};
//save blog post
export const saveBlogPostService = (blogPost) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      var jsonData = {};
      if (err && err.code == "ENOENT") {
        const key = blogPost.id;
        const value = blogPost;
        jsonData[key] = value;
      } else {
        jsonData = JSON.parse(data);
        jsonData[blogPost.id] = blogPost;
      }

      fs.writeFileSync(filepath, JSON.stringify(jsonData), (err) => {});

      return resolve(blogPost);
    });
  });
};
export const updateBlogPostService = (blogpost) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, function (err, data) {
      if (err && err.code == "ENOENT") {
        return resolve(undefined);
      }
      data = JSON.parse(data);
      var blogPost = data[blogpost.id];
      if (blogPost == undefined) {
        return resolve(blogPost);
      }
      data[blogpost.id] = blogpost;

      fs.writeFile(filepath, JSON.stringify(data), (err) => {
        return resolve(blogpost);
      });
    });
  });
};
