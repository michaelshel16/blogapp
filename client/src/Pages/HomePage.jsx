import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import BlogCard from '../components/BlogCard.jsx';
import NewPost from "../Pages/NewPost.jsx";
import HomePageImg from "../assets/pixel2.jpg";
import "./HomePage.css";
import BackgroundPost from '../components/BackgroundPost';
import PostPage from './PostPage';
import PostTypeCard from '../components/PostTypeCard';

const HomePage = () => {
  return (
     <PostTypeCard/>
    //<PostPage/>
      
    //<NewPost/>
      /*<div>
      <Container>
        
       <div className='home-container'>
            <div className='home-page-post'>
              <div className='home-page-post-image'>
                 <img src={HomePageImg} alt='image not available'/>
              </div>
              <div className='home-page-post-content'>
              <div className='home-page-post-content-title'>
                 <h1>Post Title</h1>
              </div>
              <div className='home-page-post-content-summary'>
                 summary of the post
              </div>
              <div className='home-page-post-content-author'>
                BY Author name
              </div>
              </div>
             

            </div>


          <div className='home-todays-picks'>
            <div><h3>TODAY'S PICKS</h3></div>
            <div className='home-todays-picks-slider'>
              
              <div className='home-todays-picks-slider-card'>
                
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
              </div>
              
            </div>
          </div>
          <div className='home-product-reviews'>

          </div>
       </div>
      </Container>
      <BackgroundPost/>
      </div>*/
      
    
  )
}

export default HomePage
