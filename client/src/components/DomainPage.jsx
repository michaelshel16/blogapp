import React from 'react';
import "./DomainPage.css";
import { Container } from '@mui/material';
import DomainPostimg from "../assets/pixel2.jpg";
import BlogCard from './BlogCard';
import AdBox from './AdBox';
import { Formik } from 'formik';
import * as yup from "yup";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const newsLetterSchema = yup.object().shape({
   email:yup.string().email().required("required")

});

const initalnewsLetter = { email:''}


const DomainPage = ({posts}) => {

  const navigate = useNavigate();
  const handleEmailSubmit = async(values,onSubmitProps) =>{
  
    axios.post("http://localhost:4000/blog/v1/newsletter",values)
    .then((res)=>
    {
      console.log(res);
    })
    onSubmitProps.resetForm();
  
  }
   
  
  console.log(posts);
  const length     = posts.length;
  const postIndex  = Math.floor(Math.random()*(length-1)) 
  const post       = posts[postIndex]
  console.log(post);
  return (
    
    <div>
        <AdBox/>
        <Container>
      <div className='domain-page-container'>
        <div className='domain-page-big-post'>
          <div className='domain-page-post-image'>
           <img src={`http://localhost:4000/assets/${post.image}`} 
           alt='no image available'/>
          </div>
           <div className='domain-page-post-info'>
           <div className='domain-page-post-title'
           onClick={()=>{navigate("/post",{state:post})}}>
            <h1>{post.title}</h1> 
          </div>
          <div className='domain-page-post-subtitle'>
             <h3>{post.subtitle}</h3>
          </div>
          <div className='domain-page-post-author'>
            {post.author}
          </div>
           </div>
          
        </div>
           
            <div className='domain-post-card-container'>
            { posts.map((item,index)=>
              
            ( 
              <div onClick={()=>navigate("/post",{state:item})}>
            <BlogCard
         
            key = {index} 
            post={item}/>
            </div>))
             
            }
            
           
          
           </div>
          
        
      </div>
      <div className='domain-post-newsletter-container'>
         <div className='domain-post-newsletter-title'>
           <h1>Subscribe to our Newsletter</h1>
         </div>
         <div className='domain-post-newsletter-email'>
          <Formik 
            onSubmit={handleEmailSubmit}
            initialValues={initalnewsLetter}
            validationSchema={newsLetterSchema}
          >
            {({
              values,
              errors,
             
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm
            })=>( 
            
              <form onSubmit={handleSubmit}>
                <div className='domain-post-newsletter-email-input'>
                <input name='email' type='email' placeholder='enter your mail id '
              onChange={handleChange}
              value={values.email}/>
              {Boolean(errors.email)?<div className='errors'>{errors.email}</div>:''}
                </div>
              
              </form>)
              }
         
          
          </Formik>
           
         </div>
      </div>

  </Container>

    </div>
    
  
  )
}

export default DomainPage
