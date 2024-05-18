import React, { useEffect, useState } from 'react'
import './pages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faShareFromSquare, faBookmark } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Comments from '../layout/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { fetchSuccess } from '../../redux/videoSlice';
import {format} from "timeago.js"

const Video = () => {

  const {currentUser} = useSelector((state)=>state.user);
  const {currentVideo} = useSelector((state)=>state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel,setChannel] = useState({});

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const videoRes = await axios.get(`/videos/find/${path}`)
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)
        setChannel(channelRes.data)
        dispatch(fetchSuccess(videoRes.data))
      }catch(err){}
    }
    fetchData();
  },[path,dispatch])

  return (
    <div className='content video'>
      <div className='video-content'>
        <div className='video-wrapper'>
          <iframe width="100%" height="450" src="https://www.youtube.com/embed/TcMBFSGVi1c?si=9UIYCdgIpHOvyn-6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <h1 className='video-title'>{currentVideo.title}</h1>
        <div className='video-details'>
          <span>{currentVideo.views} views . {format(currentVideo.createdAt)}</span>
          <div>
            <span><FontAwesomeIcon icon={faThumbsUp} />{currentVideo.likes?.length}Like</span>
            <span><FontAwesomeIcon icon={faThumbsDown} />Dislike</span>
            <span><FontAwesomeIcon icon={faShareFromSquare} />Share</span>
            <span><FontAwesomeIcon icon={faBookmark} />Save</span>
          </div>
        </div>
        <hr />
        <div className='channel'>
          <div className='channel-info'>
            <img src={channel.img}  />
            <div className='channel-info-text'>
              <h1>{channel.name}</h1>
              <h2>{channel.subscribers} Followers</h2>
              <p>{currentVideo.desc}</p>
            </div>
          </div>
          <Button variant="outline-info" style={{ marginTop: '10px' }}>Follow User</Button>{' '}

        </div>
        <hr/>
        <Comments/>
      </div>
      <div className='video-recommend'>recommend</div>
    </div>
  )
}

export default Video;