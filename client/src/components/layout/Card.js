import React from 'react';
import { Link } from "react-router-dom";
import imgAvengers from '../../assets/thumbnail/avengers.jpg';
const Card = () => {
  return (
    
    <Link to="/video/test" style={{textDecoration: 'none'}}>
    <div className='card-css'>
      <img src={imgAvengers} alt='' />
      <div className='card-Details'>
        <img src='' alt=''/>
        <div className='card-text'>
          <h1>Video Title</h1>
          <h2>Marvel</h2>
          <p>99,246 views . 6 days age</p>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default Card;