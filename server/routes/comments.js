import express from "express";
import { addComment, deleteComment, getComment, listComments } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router()

//Get all comments
router.get("/",listComments)

//Add a comment
router.post("/",verifyToken,addComment)

//Delete a comment
router.delete("/:id",verifyToken,deleteComment)

//Get all comments for a video
router.get("/:videoId",getComment)

export default router;