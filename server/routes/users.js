import express from "express";
import { deleteUser, dislike, getuser, like, list, subscribe, unsubscribe, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router()

//List all users
router.get("/",list)

//update a user
router.put("/:id", verifyToken, update)

//delete a user
router.delete("/:id",verifyToken, deleteUser)

//get a user
router.get("/find/:id", getuser)

//subscribe a user
router.put("/sub/:id",verifyToken, subscribe)

//unsubscribe a user
router.put("/unsub/:id",verifyToken, unsubscribe)

//like a video
router.put("/like/:videoId",verifyToken, like)

//dislike a video
router.put("/dislike/:videoId",verifyToken, dislike)

export default router;