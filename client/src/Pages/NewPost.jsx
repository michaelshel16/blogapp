import React from 'react';
import { Container } from '@mui/material';
import Dropzone from "react-dropzone";
import { Formik } from 'formik';
import * as yup from "yup";
import "./NewPost.css";




const postSchema = yup.object().shape({
    
    title:yup.string().required("required"),
    content:yup.string().required("required"),
    postType:yup.string().required("required"),
    image  :yup.string().required("required"),
    date: yup.date().required("required")
})

const intialPostData = {

    title:'',
    content:'',
    postType:'',
    image:'',
    date: new Date()
}

const handleFormSubmit = async(values,onSubmitProps)=>{

    console.log(values);
      
     
      
    axios.post("http://localhost:4000/blog/v1/post",values )
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
                   <textarea 
                   name='content' placeholder='Post content'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.content}
                   
                   />
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
                    <input type="date"
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
