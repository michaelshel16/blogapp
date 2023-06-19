import React from 'react';
import "./PostTypeCard.css";
import postImage from "../assets/pixel2.jpg";
const PostTypeCard = () => {
  return (
    <div className='post-type-card-container'>
      <div className='post-type-card-title'>
            Post type
      </div>
      <div className='post-type-card-content'>
        <div className='post-type-card-image'>
          <img src={postImage} alt='no image'/>  
        </div>
          <div className='post-type-card-content-subtitle'>
             Post type content subtitle
          </div>
          
        </div>
      </div>
 
  )
}

export default PostTypeCard
