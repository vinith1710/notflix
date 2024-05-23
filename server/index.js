import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from './routes/users.js';
import VideoRoutes from './routes/videos.js';
import CommentRoutes from './routes/comments.js';
import AuthtRoutes from './routes/auth.js';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config()

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/',(req,res) =>{
    res.send('Hello')
})

app.use(cors(
{
    origin:["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}
));
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth",AuthtRoutes)
app.use("/api/users",UserRoutes)
app.use("/api/videos",VideoRoutes)
app.use("/api/comments",CommentRoutes)

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})




mongoose.connect(process.env.DBURL)
.then(() => {
    app.listen(process.env.PORT,() => {
        console.log('MongoDB is connected and listening on port',process.env.PORT)
    })
})
.catch((error) => {
    console.error('Error connecting to MongoDB',error);
});
