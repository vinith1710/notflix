import React, { useEffect, useState } from 'react'
import './pages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faThumbsUp, faThumbsDown, faShareFromSquare, faBookmark } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Comments from '../layout/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { fetchSuccess, like, dislike } from '../../redux/videoSlice';
import { format } from "timeago.js"
import { subscription } from '../../redux/userSlice';

const Video = () => {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try{
      const videoRes = await axios.get(`/videos/find/${path}`);
      const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
      setChannel(channelRes.data);
      dispatch(fetchSuccess(videoRes.data))
      }catch(err){console.log("useeffect error->",err);}
    }
    fetchData()
  }, [path,dispatch])

  const handleLike= async ()=>{
    await axios.put(`/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }

  const handleDislike= async()=>{
    await axios.put(`/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }

  const followChannel=async()=>{
    currentUser.subscribedUsers.includes(channel._id) ?
    await axios.put(`/users/unsub/${channel._id}`) :
    await axios.put(`/users/sub/${channel._id}`)
    dispatch(subscription(channel._id));
  }

  return (
    <div className='content video'>
      <div className='video-content'>
        <div className='video-wrapper'>
          {/* <iframe width="100%" height="450" src="https://www.youtube.com/embed/TcMBFSGVi1c?si=9UIYCdgIpHOvyn-6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
        </div>
        <h1 className='video-title'>{currentVideo.title}</h1>
        <div className='video-details'>
          <span>{currentVideo.views} views . {format(currentVideo.createdAt)}</span>
          <div>
            <span onClick={handleLike}>{!currentVideo.likes?.includes(currentUser._id) ? <span><FontAwesomeIcon icon="fa-regular fa-thumbs-up" />{currentVideo.likes?.length}</span> : <span><FontAwesomeIcon icon={faThumbsUp} />{currentVideo.likes?.length}</span>}</span>
            <span onClick={handleDislike}>{!currentVideo.dislikes?.includes(currentUser._id) ? <span><FontAwesomeIcon icon="fa-regular fa-thumbs-down" />{currentVideo.dislikes?.length}</span> : <span><FontAwesomeIcon icon={faThumbsDown} />{currentVideo.dislikes?.length}</span>}</span>
            <span><FontAwesomeIcon icon={faShareFromSquare} />Share</span>
            <span><FontAwesomeIcon icon={faBookmark} />Save</span>
          </div>
        </div>
        <hr />
        <div className='channel'>
          <div className='channel-info'>
            <img src={channel.img} />
            <div className='channel-info-text'>
              <h1>{channel.name}</h1>
              <h2>{channel.subscribers} Followers</h2>
              <p>{currentVideo.desc}</p>
            </div>
          </div>
          <Button variant="outline-info" style={{ marginTop: '10px' }} onClick={followChannel}>{currentUser.subscribedUsers?.includes(channel._id) ? "FOLLOWING" : "FOLLOW USER"}</Button>

        </div>
        <hr />
        <Comments videoId={currentVideo._id}/>
      </div>
      <div className='video-recommend'>recommend</div>
    </div>
  )
}

export default Video;