import React from 'react';
import { Container } from '@mui/material';
import Dropzone from "react-dropzone";
import { Formik } from 'formik';
import * as yup from "yup";
import "./NewPost.css";
import axios from 'axios';
import { store } from '../main.jsx';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import quill from '../components/EditorModule';
import dayjs from "dayjs";




const postSchema = yup.object().shape({
    
    title:yup.string().required("required"),
    subtitle:yup.string().required("required"),
    content:yup.string().required("required"),
    postType:yup.string().required("required"),
    image  :yup.string().required("required"),
    date: yup.string().required("required")
})

const intialPostData = {

    title:'',
    subtitle:'',
    content:'',
    postType:'',
    image:'',
    date: ''
}

const handleFormSubmit = async(values,onSubmitProps)=>{
  const state = store.getState();

  const user  = state.user;
  const token = state.token;
  
  const formData = new FormData();

  for (let value in values)
  {
    formData.append(value,values[value])
  }
  formData.append("image",values.image.name)
  formData.append("userId",user._id)
  formData.append("email",user.email)
  formData.append("author",user.firstName+" "+user.lastName)
 


  console.log(formData) 
      
     
      
    axios.post("http://localhost:4000/blog/v1/user/posts",formData,
    {
      headers:{
        "Authorization":`Bearer ${token}`,
        "Content-Type":"mutipart/form-data"    }
    } )
    .then((res)=>
    {
      console.log(res);
    })
    onSubmitProps.resetForm();

}

const NewPost = () => {
 
  return (
    <Container>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={intialPostData}
          validationSchema={postSchema}
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

                }
            )=>(
                <form onSubmit={handleSubmit}>
            <div className='post-container'>
                <div className='post-title'>
                  <input name='title' placeholder='Give title to your post'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  
                  />
                  {Boolean(touched.title)&&Boolean(errors.title)?
                  <div className='errors'>{errors.title}</div>:""}
                </div>
               <div className='post-sub-title'>
                  <input name='subtitle' placeholder='Give subtitle to your post'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subtitle}
                  
                  />
                  {Boolean(touched.subtitle)&&Boolean(errors.subtitle)?
                  <div className='errors'>{errors.title}</div>:""}
                </div>

                <div className='post-content-type'>
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
                <div className='post-content'>
                  <div className='post-content-editor'>
                <ReactQuill 
                 theme='snow'
                 modules={quill.modules} 
                value={values.content} 
                onChange={handleChange} 
                onBlur={handleBlur}/>
                  </div>
                
                    {Boolean(touched.content)&&Boolean(errors.content)?
                  <div className='errors'>{errors.content}</div>:""}
                </div>
                <div className='post-image'>
                 <Dropzone
                   acceptedFiles = ".jpg,.jpeg,.png"
                   multiple = {false}
                    onDrop={(acceptedFiles)=>setFieldValue('image',acceptedFiles[0])}
                 
                 >
                   {({getRootProps,getInputProps})=>
                   
                   (
                       <div {...getRootProps()} className='post-image-dropzone'>
                             
                          <input {...getInputProps()}/>
                          {!values.image?(<p>Drag or Click here to insert Picture</p>):(<p>{values.image.name}</p>)}
                       </div>
                             


                   )}
                  
                  
                  </Dropzone>  
                </div>
                <div className='post-date'>
                    <input 
                    type="date"
                    name='date'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date} />
                     {Boolean(touched.date)&&Boolean(errors.date)?
                  <div className='errors'>{errors.date}</div>:""}
                </div>
                <div className='post-submit-button'>
            <button type='submit'>Submit</button>
           </div>
              </div>
             
                </form>
               


            )}
       
        </Formik>
    </Container>
  )
}

export default NewPost
