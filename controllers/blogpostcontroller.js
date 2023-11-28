import {
  deleteBlogPostService,
  getAllBlogPostsService,
  getBlogPostByIdService,
  saveBlogPostService,
  updateBlogPostService,
} from "../services/postservices.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var filepath = path.join(__dirname, "..", "jsondatastore/blogpost.json");

export const getAllBlogPost = async (req, res) => {
  await getAllBlogPostsService().then((blogPost) => {
    if (blogPost == undefined) {
      return res
        .status(404)
        .json({ status: 404, message: "No Posts Found", data: {} });
    }
    return res.status(201).json({
      status: 201,
      message: "Posts Fetched Successfully",
      data: blogPost,
    });
  });
};
//get blogpost by id
export const getById = async (req, res) => {
  await getBlogPostByIdService(req.params.id).then((blogPost) => {
    if (blogPost == undefined) {
      return res.status(404).json({
        status: 404,
        message: "BlogPost for given id " + req.params.id + " Not Found",
        data: {},
      });
    }
    return res.status(201).json({
      status: 201,
      message: "Posts Fetched Successfully",
      data: blogPost,
    });
  });
};
//save blogpost
export const saveBlogPost = async (req, res) => {
  await saveBlogPostService(res.locals.blogpost).then((blogPost) => {
    return res.status(201).json({
      status: 201,
      message: "Post Inserted Successfully",
      data: blogPost,
    });
  });
};
//update blogpost
export const updateBlogPost = async (req, res) => {
  await updateBlogPostService(res.locals.blogpost).then((blogPost) => {
    if (blogPost == undefined) {
      return res.status(404).json({
        status: 404,
        message:
          "BlogPost for given id " + res.locals.blogpost.id + " Not Found",
        data: {},
      });
    }
    return res.status(201).json({
      status: 201,
      message: "Post Updated Successfully",
      data: res.locals.blogpost,
    });
  });
};
//delete blog post
export const deleteBlogPost = async (req, res) => {
  await deleteBlogPostService(req.params.id).then((blogPost) => {
    if (blogPost == undefined) {
      return res.status(404).json({
        status: 404,
        message: "BlogPost for given id " + req.params.id + " Not Found",
        data: {},
      });
    }
    return res.status(201).json({
      status: 201,
      message: "Blog Post Deleted Successfully",
      data: blogPost,
    });
  });
};
