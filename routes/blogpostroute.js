import { Router } from "express";
import {
  getAllBlogPost,
  saveBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getById,
} from "../controllers/blogpostcontroller.js";
let router = Router();
router.get("/getall", getAllBlogPost);
router.get("/getbyid/:id", getById);
router.post("/save", saveBlogPost);
router.patch("/update", updateBlogPost);
router.delete("/delete/:id", deleteBlogPost);
export default router;
