import { Router } from "express";
import {
  getAllBlogPost,
  saveBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getById,
} from "../controllers/blogpostcontroller.js";
import { postValidator } from "../validator/postvalidator.js";
let router = Router();
router.get("/getall", getAllBlogPost);
router.get("/getbyid/:id", getById);
router.post("/save", postValidator, saveBlogPost);
router.patch("/update", postValidator, updateBlogPost);
router.delete("/delete/:id", deleteBlogPost);
export default router;
