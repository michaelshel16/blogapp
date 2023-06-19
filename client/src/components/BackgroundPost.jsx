import React from 'react';
import BackgroundImage from "../assets/pixel2.jpg";
import "./BackgroundPost.css";
import PostTypeCard from './PostTypeCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BackgroundPost = () => {
  return (
    <div className='bg-post-container'>
      <div className='bg-post-read-more'>
        <h1>Read more <ArrowForwardIcon/></h1>
      </div>
      <div className='bg-post-image'>
          <img src={BackgroundImage} alt='no image available'/>
        </div>
      <div className='bg-post-content'>
        
      <div className='bg-post-title'>
          <h1>Post title</h1>
      </div>
      <div className='bg-post-summary'>
          post summary
      </div>
      </div>
      <div className='post-type-cards-container'>
        
      </div>
      
    </div>
  )
}

export default BackgroundPost
