import React, { useEffect, useState } from 'react';
import './pages.css';
import Card from '../layout/Card';
import axios from "axios";

const Home = ({type}) => {

  const [videos,setVideos] = useState([]);
  useEffect(()=>{
    const fetchVideos = async ()=>{
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data);
    }
    fetchVideos()
  },[type])
  
  return (
    <div className='content home'>
      {videos.map((video)=>(
        <Card key={video._id} video={video}/>
       ))} 
    </div>
  );
};

export default Home;