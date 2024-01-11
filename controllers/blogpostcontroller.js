import { createClient } from "redis";

import {
  deleteBlogPostService,
  getAllBlogPostsService,
  getBlogPostByIdService,
  saveBlogPostService,
  updateBlogPostService,
  getByText,
  getMostPopular,
} from "../services/postservices.js";
export const getAllBlogPost = async (req, res) => {
  await getAllBlogPostsService()
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
};
export const getPopularBlogPost = async (req, res) => {
  await getMostPopular()
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
};
export const findByText = async (req, res) => {
  await getByText(req.body.text)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
};
//get blogpost by id
export const getBlogPostById = async (req, res) => {
  await getBlogPostByIdService(req.params.id)
    .then((result) => {
      // const redisClient = new Redis({
      //   port: 33657,
      //   host: "usw1-learning-basilisk-33657.upstash.io",
      //   password: "943df4edddbe457aa7213b4e63f32330",
      // });
const client = createClient()
      // const pid = req.params.id;
      // client.hSet("popularBlogs", { pid: { occur: 11, exp: new Date() } });
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
};
//save blogpost
export const saveBlogPost = async (req, res) => {
  await saveBlogPostService(req.body)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(403).json(error);
    });
};
//update blogpost
export const updateBlogPost = async (req, res) => {
  await updateBlogPostService(req.params.id, req.body)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
};
//delete blog post
export const deleteBlogPost = async (req, res) => {
  await deleteBlogPostService(req.params.id)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });
};
