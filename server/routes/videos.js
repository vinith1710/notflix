import express from "express";
import { addVideo, addView, deleteVideo, getVideo, random, search, sub, tags, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router()


//Create a video
router.post("/",verifyToken,addVideo)

//Update a video
router.put("/:id",verifyToken,updateVideo)

//Delete a video
router.delete("/:id",verifyToken,deleteVideo)

//Requst a video
router.get("/find/:id",getVideo)

//Update views
router.put("/view/:id",addView)

//Trending videos
router.get("/trend",random)

//Random videos
router.get("/random",random)

//subscribed channel videos
router.get("/sub",verifyToken, sub)

//Search using Tags
router.get("/tags", tags)

//Searching a video
router.get("/search", search)



export default router;