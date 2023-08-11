import React, { useState } from 'react';
import { Container } from '@mui/material';
import Dropzone from 'react-dropzone';
import "./Editpost.css";
import axios from 'axios';
import {store} from "../main.jsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import quill from '../components/EditorModule';
import { useSelector } from 'react-redux';








const EditPost = () => {
  const [postData,setPostData] = useState({
    title:"",
    subtitle:"",
    postType:"",
    content:"",
    image  :"",
    date   :""
    
  
  })
  
  
  const handleFormSubmit = (e)=>{

    e.preventDefault();
    const state = store.getState();
    
    const user   = state.user
    const token  = state.token;
    const post   = state.editPost;
 
    console.log(post)
    const formData = new FormData();
    for(let value in postData)
    {
     formData.append(value,postData[value])
    }
    formData.append("image",postData.image)
    formData.append("userId",user._id)
    formData.append("postId",post._id)
    formData.append("email",user.email)
    formData.append("author",user.firstName+" "+user.lastName)
 
    console.log(formData);
 
    axios.patch("http://localhost:4000/blog/v1/editpost"
    ,formData,
    {headers:{
     "Content-Type":"multipart/form-data",
     "Authorization":`Bearer ${token}`}})
 
 }
  
  
  const post = useSelector((state)=>state.editPost)
  console.log(post)
  return (
  <Container>
     

        <form onSubmit={handleFormSubmit}>
          <div className='edit-post-container'>
                <div className='edit-post-title'>
                  <input name='title' 
                    
                    
                    onChange={e=>setPostData({...postData,title:e.target.value})}
                    
                  />
                  
                </div>
               <div className='edit-post-sub-title'>
                  <input name='subtitle' 
                    onChange={e=>setPostData({...postData,subtitle:e.target.value})}
                  
                    
                 
                  
                  />
                  
                </div>

                <div className='edit-post-content-type'>
                    <label>Which domain you want to post?</label>
                    <select name='postType' 
                     onChange={e=>setPostData({...postData,postType:e.target.value})}
                     
                   
                     
                     >
                      <option value={"tech"}>TECH</option>
                      <option value={"business"}>BUSINESS</option>
                      <option value={"reviews"}>REVIEWS</option>
                    </select>
                    

                </div>
                <div className='edit-post-content'>
                  <div className='edit-post-content-editor'>
                  <ReactQuill 
                 theme='snow'
                
                 modules={quill.modules} 
                 name = "content"
                onChange={e=>setPostData({...postData,title:e.target.value})} 
                />
                 
                  </div>
                
                   
                </div>
                <div className='edit-post-image'>
                 <Dropzone
                   acceptedFiles = ".jpg,.jpeg,.png"
                   multiple = {false}
                   
                    onDrop={(acceptedFiles)=>setPostData({...postData,image:acceptedFiles[0].name})}
                   name = "image"
                 >
                   {({getRootProps,getInputProps})=>
                   
                   (
                       <div {...getRootProps()} className='edit-post-image-dropzone'>
                             
                          <input {...getInputProps()}/>
                          {!postData.image?(<p>Drag or Click here to insert Picture</p>):(<p>{postData.image}</p>)}
                       </div>
                             


                   )}
                  
                  
                  </Dropzone>  
                </div>
                <div className='edit-post-date'>
                    <input 
                    type="date"
                    name='date'
                    onChange={e=>setPostData({...postData,date:e.target.value})}
                    />
                   
                </div>
                <div className='edit-post-submit-button'>
            <button type='submit'>Submit</button>
           </div>
              </div>
             




        </form>






    
  </Container>
  )
}

export default EditPost
