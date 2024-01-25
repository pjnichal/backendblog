import { Router } from "express";
import {
  loginandauth,
  registerUser,
  accessToken,
  deleteUser,
} from "../controllers/usercontroller.js";

let router = Router();
router.post("/register", registerUser);
router.post("/access", accessToken);
router.post("/login", loginandauth);
router.delete("/delete/:id", deleteUser);
export default router;
