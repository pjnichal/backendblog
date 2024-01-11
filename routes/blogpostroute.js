import { Router } from "express";
import {
  getAllBlogPost,
  saveBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
} from "../controllers/blogpostcontroller.js";

let router = Router();
router.get("/", getAllBlogPost);
router.get("/:id", getBlogPostById);
router.post("/",  saveBlogPost);
router.patch("/:id", updateBlogPost);
router.delete("/:id", deleteBlogPost);
export default router;
