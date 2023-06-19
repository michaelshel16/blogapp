import React from 'react';
import BlogImage from "../assets/pixel2.jpg";
import "./BlogCard.css";


const BlogCard = () => {
  return (
    <div className='blog-card-container'>
      <div className='blog-card-img'>
        <img src={BlogImage} alt='no image available'/>

      </div>
      <div className='blog-card-title'>
        <h4>Google Pixel update brings missing features</h4>
      </div>
      <div className='blog-card-author'>
         BY MICHELLE SHANE
      </div>
    </div>
  )
}

export default BlogCard
