import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';



const Dashboard = () => {
    const { currentUser } = useSelector((state) => state.user);
    
    const [users, setUsers] = useState([]);
    const [videos, setVideos] = useState([]);
    const [comments , setComments] = useState([]);
    
    useEffect(()=>{
        const userfetch=async()=>{
            const userList = await axios.get("/users/");
            setUsers(userList.data)
            const videoList = await axios.get("/users/");
            setVideos(videoList.data)
            const commentList = await axios.get("/comments/")
            setComments(commentList.data)
        }
        userfetch();
    },[])
    
    
    
    if(!currentUser){
        return <Navigate to="/" replace/>
      }
      else if(!currentUser.isAdmin){
        return <Navigate to="/home" replace/>
      }

  return (
    <>
        <div className='content dashboard'>
            <div className='card-wrapper'>

<div className='dashboard-card' style={{backgroundColor:"pink"}}>
    <h1>Users</h1>
    <h3>{ users ? users.length : "Loading"}</h3>
</div>
<div className='dashboard-card'style={{backgroundColor:"rgb(1, 255, 192"}}>
    <h1>Videos</h1>
    <h3>{videos ? videos.length : "Loading"}</h3>
</div>
<div className='dashboard-card' style={{backgroundColor:"rgb(1, 132, 255)"}}>
    <h1>Comments</h1>
    <h3>{comments ? comments.length : "Loading"}</h3>
</div>
            </div>
        </div>
    </>
  )
}

export default Dashboard