import { createError } from "../error.js"
import Comment from "../models/Comments.js"

export const addComment = async (req,res,next)=>{
    const newComment = new Comment({...req.body, userId:req.user.id})
    try{
        const saveComment = await newComment.save()
        res.status(200).json(saveComment)
    }catch(err){
        next(err)
    }
}

export const deleteComment = async (req,res,next)=>{
    try{
        const comment = await Comment.findById(res.params.id)
        const video = await Video.findById(res.params.id)
        if(req.user.id === comment.user.id || req.user.id === video.user.id){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("The comment has been deleted")
        }else{
            return next(createError(403,"The is not your comment"));
        }
    }catch(err){
        next(err)
    }
}

export const getComment = async (req,res,next)=>{
    try{
        const comments = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(comments)
    }catch(err){
        next(err)
    }
}