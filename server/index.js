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
import path from 'path';
import { fileURLToPath } from "url";

//Resolving dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
dotenv.config()
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



// app.get('/',(req,res) =>{
//     res.send('Hello')
// })

app.use(cors(
{
    origin:"*",
    methods: ["GET","POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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

//To use Client app
app.use(express.static(path.join(__dirname,'/client/build')));

//Render client for Any path
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'/client/build/index.html')));

mongoose.connect(process.env.DBURL)
.then(() => {
    app.listen(process.env.PORT,() => {
        console.log('MongoDB is connected and listening on port',process.env.PORT)
    })
})
.catch((error) => {
    console.error('Error connecting to MongoDB',error);
});
