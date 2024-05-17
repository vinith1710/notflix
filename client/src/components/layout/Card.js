import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// import imgAvengers from '../../assets/thumbnail/avengers.jpg';
import {format} from "timeago.js";
const Card = ({type,video}) => {

  const [channel,setChannel] = useState({});
  useEffect(()=>{
    const fetchChannel = async ()=>{
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    }
    fetchChannel()
  },[video.userId])

  return (
    
    <Link to={`/video/${video._id}`} style={{textDecoration: 'none'}}>
    <div className='card-css'>
      <img type={type} src={video.imgUrl} alt='' />
      <div className='card-Details'>
        <img type={type}  src={channel.img} alt=''/>
        <div className='card-text'>
          <h1>{video.title}</h1>
          <h2>{channel.name}</h2>
          <p>{video.views} views . {format(video.createdAt)}</p>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default Card;