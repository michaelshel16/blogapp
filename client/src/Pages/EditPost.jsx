import React from 'react';
import { Container } from '@mui/material';
import Dropzone from 'react-dropzone';
import {Formik} from 'formik';
import * as yup from "yup";
import "./Editpost.css";
import axios from 'axios';
import {store} from "../main.jsx";



const editPostSchema = yup.object().shape({
    
    title:yup.string().required("required"),
    subtitle:yup.string().required("required"),
    content:yup.string().required("required"),
    postType:yup.string().required("required"),
    image  :yup.string().required("required"),
    date: yup.string().required("required")
})

const initialEditPostData = {

    title:'',
    subtitle:'',
    content:'',
    postType:'',
    image:'',
    date: ''
}

const handleFormSubmit = (values,onSubmitProps)=>{

   const state = store.getState();
   
   const user   = state.user
   const token  = state.token;
   const postId = state.editPostId;
   const formData = new FormData();
   for(let value in values)
   {
    formData.append(value,values[value])
   }
   formData.append("image",values.image.name)
   formData.append("userId",user._id)
   formData.append("postId",postId)
   formData.append("email",user.email)
   formData.append("author",user.firstName+" "+user.lastName)

   console.log(formData);

   axios.patch("http://localhost:4000/blog/v1/editpost"
   ,formData,
   {headers:{
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`}})

}


const EditPost = () => {
  return (
  <Container>
      <Formik
       onSubmit={handleFormSubmit}
       initialValues={initialEditPostData}
       validationSchema={editPostSchema}
      >
      {(
        {
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm

      })=>(

        <form onSubmit={handleSubmit}>
          <div className='edit-post-container'>
                <div className='edit-post-title'>
                  <input name='title' placeholder='Give title to your post'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  
                  />
                  {Boolean(touched.title)&&Boolean(errors.title)?
                  <div className='errors'>{errors.title}</div>:""}
                </div>
               <div className='edit-post-sub-title'>
                  <input name='subtitle' placeholder='Give subtitle to your post'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subtitle}
                  
                  />
                  {Boolean(touched.subtitle)&&Boolean(errors.subtitle)?
                  <div className='errors'>{errors.title}</div>:""}
                </div>

                <div className='edit-post-content-type'>
                    <label>Which domain you want to post?</label>
                    <select name='postType' 
                    onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.postType}
                     >
                      <option value={"tech"}>TECH</option>
                      <option value={"business"}>BUSINESS</option>
                      <option value={"reviews"}>REVIEWS</option>
                    </select>
                    {Boolean(touched.postType)&&Boolean(errors.postType)?
                    <div className='errors'>{errors.postType}</div>:""}

                </div>
                <div className='edit-post-content'>
                   <textarea 
                   name='content' placeholder='Post content'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.content}
                   
                   />
                    {Boolean(touched.content)&&Boolean(errors.content)?
                  <div className='errors'>{errors.content}</div>:""}
                </div>
                <div className='edit-post-image'>
                 <Dropzone
                   acceptedFiles = ".jpg,.jpeg,.png"
                   multiple = {false}
                    onDrop={(acceptedFiles)=>setFieldValue('image',acceptedFiles[0])}
                 
                 >
                   {({getRootProps,getInputProps})=>
                   
                   (
                       <div {...getRootProps()} className='edit-post-image-dropzone'>
                             
                          <input {...getInputProps()}/>
                          {!values.image?(<p>Drag or Click here to insert Picture</p>):(<p>{values.image.name}</p>)}
                       </div>
                             


                   )}
                  
                  
                  </Dropzone>  
                </div>
                <div className='edit-post-date'>
                    <input 
                    type="date"
                    name='date'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date} />
                     {Boolean(touched.date)&&Boolean(errors.date)?
                  <div className='errors'>{errors.date}</div>:""}
                </div>
                <div className='edit-post-submit-button'>
            <button type='submit'>Submit</button>
           </div>
              </div>
             




        </form>






      )}
     </Formik>
  </Container>
  )
}

export default EditPost
