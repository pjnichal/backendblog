import { Router } from "express";
import {
  getAllBlogPost,
  saveBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
} from "../controllers/blogpostcontroller.js";
import { blogPostValidator } from "../validator/blogpostvalidator.js";
let router = Router();
router.get("/", getAllBlogPost);
router.get("/:id", getBlogPostById);
router.post("/", blogPostValidator, saveBlogPost);
router.patch("/", blogPostValidator, updateBlogPost);
router.delete("/:id", deleteBlogPost);
export default router;
