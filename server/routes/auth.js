import express from "express";
import { signin, signup, googleAuth } from "../controllers/auth.js";

const router = express.Router()

//Create User
router.post("/signup",signup)

//Sign in
router.post("/signin", signin)

//Google Autj
router.post("/google", googleAuth)

export default router;