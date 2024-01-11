import { Router } from "express";
import {
  loginandauth,
  registerUser,
  accessToken,
} from "../controllers/usercontroller.js";

let router = Router();
router.post("/register", registerUser);
router.post("/access", accessToken);
router.post("/login", loginandauth);
export default router;
