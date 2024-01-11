import { Router } from "express";
import { loginandauth, registerUser } from "../controllers/usercontroller.js";

let router = Router();
router.post("/register", registerUser);
router.post("/login", loginandauth);
export default router;
