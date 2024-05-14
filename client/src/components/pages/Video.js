import React from 'react'
import './pages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faShareFromSquare, faBookmark } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Comments from '../layout/Comments';
const Video = () => {
  return (
    <div className='content video'>
      <div className='video-content'>
        <div className='video-wrapper'>
          <iframe width="100%" height="450" src="https://www.youtube.com/embed/TcMBFSGVi1c?si=9UIYCdgIpHOvyn-6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <h1 className='video-title'>Video Title</h1>
        <div className='video-details'>
          <span>99,246 views . 17 Oct, 2023</span>
          <div>
            <span><FontAwesomeIcon icon={faThumbsUp} />Like</span>
            <span><FontAwesomeIcon icon={faThumbsDown} />Dislike</span>
            <span><FontAwesomeIcon icon={faShareFromSquare} />Share</span>
            <span><FontAwesomeIcon icon={faBookmark} />Save</span>
          </div>
        </div>
        <hr />
        <div className='channel'>
          <div className='channel-info'>
            <img src='' alt='' />
            <div className='channel-info-text'>
              <h1>Channel Name</h1>
              <h2>102k Followers</h2>
              <p>cbasic ascgasaicg asics cscssc uuscg c cg cyqucu cuq</p>
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