import React from 'react';
import { Container } from '@mui/material';
import PostMainImage from "../assets/pixel2.jpg";
import "./PostPage.css";

const PostPage = () => {
  return (
    
        <Container>
          <div className='post-page-container'>

          
         <div className='post-page-header'>
          <div className='post-page-type'>
             Post Type
          </div>
           <div className='post-page-title'>
              <h1>post title</h1>  
           </div>
          
           <div className='post-page-subtitle'>
             <h3>Post subtitle</h3> 
           </div>
          <div className='post-page-author'>
             <h3>Post author</h3>
          </div>
         </div>
         
          <div className='post-page-main-image'>
            <img src={PostMainImage} alt='no image available'/>
          </div>
           <div className='post-page-content'>
             <p>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Odio recusandae, maxime 
                ipsam laboriosam numquam quod sunt praesentium 
                id repudiandae vero repellendus voluptatum repellat, 
                modi earum hic nisi a illum alias.t</p>
           </div>
        </div>
        
           
        </Container>
      
    
  )
}

export default PostPage
