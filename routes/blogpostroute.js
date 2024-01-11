import { Router } from "express";
import {
  getAllBlogPost,
  saveBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
  findByText,
} from "../controllers/blogpostcontroller.js";
import { auth } from "../middleware/auth.js";

let router = Router();
router.get("/", auth, getAllBlogPost);
router.get("/:id", auth, getBlogPostById);
router.post("/", auth, saveBlogPost);
router.patch("/:id", auth, updateBlogPost);
router.delete("/:id", auth, deleteBlogPost);
router.post("/getbytext", auth, findByText);
export default router;
