import express from "express";
import { signup } from "../controllers/auth.js";

const router = express.Router()

//Create User
router.post("/signup",signup)

//Sign in
router.post("/signin",)

//Google Autj
router.post("/google",)

export default router;