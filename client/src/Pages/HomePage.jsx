import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import BlogCard from '../components/BlogCard.jsx';
import HomePageImg from "../assets/pixel2.jpg"
import "./HomePage.css";
import BackgroundPost from "../components/BackgroundPost.jsx";

//import PostTypeCard from '../components/PostTypeCard';

import axios from 'axios';
import { useEffect,useState} from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTechPosts,setBusinessPosts,setReviewsPosts } from '../State';
import { Navigate, useNavigate } from 'react-router-dom';
import PostPage from '../components/PostPage';

const HomePage = () => {
 
  
  const dispatch     = useDispatch()
  const navigate     = useNavigate();
  
  
 
  useEffect(()=>

  { axios.all([
  axios.get("https://blog-full-stack-ndnl.onrender.com/blog/v1/posts/tech"),
  axios.get("https://blog-full-stack-ndnl.onrender.com/blog/v1/posts/business"),
  axios.get("https://blog-full-stack-ndnl.onrender.com/blog/v1/posts/reviews")
])
     
     .then((resArr)=>
     {  
         dispatch(
          setTechPosts({
          techPosts:resArr[0].data
         }))

         dispatch(
          setBusinessPosts({
            businessPosts:resArr[1].data
          })
         )
         dispatch(setReviewsPosts({
          reviewsPosts:resArr[1].data
         }))

     })
     
    },[])

    const techPosts      = useSelector((state)=> 
                                       state.techPosts)
    const reviewsPosts   = useSelector((state)=> 
                                       state.reviewsPosts)
    const businessPosts  = useSelector((state)=> 
                                       state.businessPosts);
    const HomePageArray  = techPosts.concat(reviewsPosts,
                                       businessPosts);
    const length         = HomePageArray.length
    const Array          = arrayPusher()
    const postArray      = postGenerator();
    const HeaderPost     = postArray[0];
    const BgPost         = postArray[1];


   function arrayPusher ()
   {
     
    let array = [];
    let IndexArray = [];

    while(IndexArray.length<5)
    {
      let candidateInt = Math.floor(Math.random()*length-1)+1
      if(IndexArray.indexOf(candidateInt)===-1)
      IndexArray.push(candidateInt)
    }
     console.log(IndexArray);
    for(let i=0;i<5;i++)
    {
      array.push(HomePageArray[IndexArray[i]]) 
    }
    console.log(array);  
    return(array)
   }

   

   function postGenerator  () 
   {
     let array = [];
   

     HomePageArray.map((item)=>
     {
        if(Array.indexOf(item)===-1)
        array.push(item)  
     })
     return (array)
   }

   
  console.log(Array)
    

    return (

       <div >
        
      <Container>
        
       <div className='home-container'>
            <div className='home-page-post'>
              <div className='home-page-post-image'>
                 <img src={`https://blog-full-stack-ndnl.onrender.com/assets/${HeaderPost.image}`}
                  alt='image not available'/>
              </div>
              <div className='home-page-post-content'>
              <div className='home-page-post-content-title'
              onClick={()=>{navigate("/post",{state:HeaderPost})}}>
                 <h1 >{HeaderPost.title}</h1>
              </div>
              <div className='home-page-post-content-summary'>
                 {HeaderPost.subtitle}
              </div>
              <div className='home-page-post-content-author'>
                {HeaderPost.author}
              </div>
              </div>
             

            </div>


          <div className='home-todays-picks'>
            <div><h3>TODAY'S PICKS</h3></div>
          
              
              <div className='home-todays-picks-slider-card'>
              { Array.map((item,index)=>
              (
                <BlogCard post = {item} 
                 key={index}
                />
              ))
                
              }
              
              
              </div>
              
            
          </div>
          
       </div>
      </Container>
      <BackgroundPost post = {BgPost}/>
      </div>
      
    
  )
}

export default HomePage
