import React from 'react';
import "./DomainPage.css";
import { Container } from '@mui/material';
import DomainPostimg from "../assets/pixel2.jpg"
import BlogCard from '../components/BlogCard';
import AdBox from '../components/AdBox';
import { Formik } from 'formik';
import * as yup from "yup";


const newsLetterSchema = yup.object().shape({
   email:yup.string().email().required("required")

});

const initalnewsLetter = { email:''}


const DomainPage = () => {


  const handleEmailSubmit = async(values,onSubmitProps) =>{
  
    axios.post("http://localhost:4000/blog/v1/newsletter",values)
    .then((res)=>
    {
      console.log(res);
    })
    onSubmitProps.resetForm();
  
  }

  return (
    <div>
        <AdBox/>
        <Container>
      <div className='domain-page-container'>
        <div className='domain-page-big-post'>
          <div className='domain-page-post-image'>
           <img src={DomainPostimg} alt='no image available'/>
          </div>

          <div className='domain-page-post-title'>
            <h1>Post Title</h1> 
          </div>
          <div className='domain-page-post-subtitle'>
             <h3>Post Subtitle</h3>
          </div>
          <div className='domain-page-post-author'>
             By Author
          </div>
        </div>
        <div className='domain-post-image-container'>
           <BlogCard/>
           <BlogCard/>
           <BlogCard/>
           <BlogCard/>
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
