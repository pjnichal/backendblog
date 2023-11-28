import { Router } from "express";
import {
  getAllBlogPost,
  saveBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getById,
} from "../controllers/blogpostcontroller.js";
import { postvalitor } from "../validator/postvalidator.js";
let router = Router();
router.get("/getall", getAllBlogPost);
router.get("/getbyid/:id", getById);
router.post("/save", postvalitor, saveBlogPost);
router.patch("/update", postvalitor, updateBlogPost);
router.delete("/delete/:id", deleteBlogPost);
export default router;
