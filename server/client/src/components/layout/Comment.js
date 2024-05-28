import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format } from "timeago.js"

const Comment = ({comment}) => {

  const [channel,setChannel] = useState({});

  useEffect(()=>{
    const fetchComment = async()=>{
      const res = await axios.get(`/users/find/${comment.userId}`)
      setChannel(res.data)
    }
    fetchComment();
  },[comment])

  return (
    <>
    <div className='comment'>
            
            <img src={channel.img} alt='' />
            <div className='comment-details'>
                <div className='comment-user-details'>
                <span>{channel.name}</span> <date>{format(comment.createdAt)} days ago</date>
                </div>
                
                <p>{comment.desc}</p>
            </div>
          </div>
    </>
  )
}

export default Comment