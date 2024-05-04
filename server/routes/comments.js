import express from "express";
import { addComment, deleteComment, getComment } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router()

//Add a comment
router.post("/",verifyToken,addComment)

//Delete a comment
router.delete("/:id",verifyToken,deleteComment)

//Get all comments
router.get("/:videoId",getComment)

export default router;