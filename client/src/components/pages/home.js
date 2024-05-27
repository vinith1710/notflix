import React, { useEffect, useState } from 'react';
import './pages.css';
import Card from '../layout/Card';
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = ({type}) => {
  const { currentUser } = useSelector((state) => state.user);

  const [videos,setVideos] = useState([]);
  useEffect(()=>{
    const fetchVideos = async ()=>{
      const res = await axios.get(`https://notflix-server-nine.vercel.app/api/videos/${type}`);
      setVideos(res.data);
    }
    fetchVideos()
  },[type])
  
  if(!currentUser){
    return <Navigate to="/" replace/>
  }
  return (
    <div className='content home'>
      {videos.map((video)=>(
        <Card key={video._id} video={video}/>
       ))} 
    </div>
  );
};

export default Home;