import Video from "../models/video.js";
import { createError } from "../error.js"
import User from "../models/User.js";

export const listVideos = async(req,res,next)=>{
    try{
        const videolist = await Video.find()
        res.status(200).json(videolist)
    }catch(err){next(err)};
}


export const addVideo = async (req,res,next)=>{
const newVideo = new Video({userId:req.user.id, ...req.body});
try{
    const saveVideo = await newVideo.save();
    res.status(200).json(saveVideo);
}catch(err){next(err)};
};

export const updateVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404,"Video not found!"))
        if(req.user.id === video.userId){
            const updateVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true}
        );
        res.status(200).json(updateVideo)
        }
        else{
            return next(createError(403,"you can not update other user video!"))
        }
    }catch(err){next(err)}
};

export const deleteVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404,"Video not found!"))
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("Video successfully deleted")
        }
        else{
            return next(createError(403,"you can not delete other user video!"))
        }
    }catch(err){next(err)}
};

export const getVideo = async (req,res)=>{
    try{
        console.log("get a viodeo",req.user.id);
        const data = {"userId":req.user.id,"paramId":req.params.id}
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    }catch(err){ const data = {"userId":req.user.id,"paramId":req.params.id}; res.status(200).json(data)}
};

export const addView = async (req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views: 1}
        })
        res.status(200).json("views has been increased")
    }catch(err){next(err)}
};

export const random = async (req,res,next)=>{
    try{
        const video = await Video.aggregate([{$sample:{size:20}}]);
        res.status(200).json(video)
    }catch(err){next(err)}
};

export const trend = async (req,res,next)=>{
    try{
        const videos = await Video.find().sort({views: -1});
        res.status(200).json(videos)
    }catch(err){next(err)}
};

export const sub = async (req,res,next)=>{
    try{
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(channelId=>{
                return Video.find({userId:channelId});
            })
        );
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt));
    }catch(err){next(err)}
};

export const tags = async (req,res,next)=>{
    const tags = req.query.tags.split(",");
    try{
        const videos = await Video.find({tags:{$in:tags}}).limit(20);
        res.status(200).json(videos)
    }catch(err){next(err)}
};

export const search = async (req,res,next)=>{
    const query = req.query.q;  
    try{
        const videos = await Video.find({title: {$regex: query, $options: "i"},}).limit(20);
        res.status(200).json(videos)
    }catch(err){next(err)}
};
