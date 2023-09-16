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
import {  useNavigate } from 'react-router-dom';


const HomePage = () => {
 
  
 
 const navigate                         = useNavigate();
 const [HomePageArray,setHomePageArray] = useState([]); 
  
 
  
    const techPosts      = useSelector((state)=> 
                                       state.techPosts)
    const reviewsPosts   = useSelector((state)=> 
                                       state.reviewsPosts)
    const businessPosts  = useSelector((state)=> 
                                       state.businessPosts);
    setHomePageArray(techPosts.concat(reviewsPosts,
                                       businessPosts));
    const length         = HomePageArray.length
    

   
  
  /*  const  arrayPusher = ()=>
   {
     
    let array = [];
    let IndexArray = [5];

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

   

   const postGenerator = ()=> 
   {
     let array = [];
   

     HomePageArray.map((item)=>
     {
        if(Array.indexOf(item)===-1)
        array.push(item)  
     })
     return (array)
   }
    
    const Array          = techPosts
    const postArray      = reviewsPosts
    const HeaderPost     = techPosts[0];
    const BgPost         = reviewsPosts[1];*/


   

   
  console.log(Array)
    

    return (

       <div >
        
      <Container>
        
       <div className='home-container'>
            <div className='home-page-post'>
              <div className='home-page-post-image'>
                 <img src={`http://localhost:4000/assets/${HeaderPost.image}`}
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

