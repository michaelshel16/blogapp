import React, { useState } from 'react';
import { Container } from '@mui/material';
import Dropzone from 'react-dropzone';
import "./Newpost.css";
import axios from 'axios';
import {store} from "../main.jsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import quill from '../components/EditorModule';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPosts } from '../State';
import { useNavigate } from 'react-router-dom';








const NewPost = () => 
{
  const [postData,setPostData] = useState({
    title:'',
    subtitle:'',
    postType:'',
    imageContent:'',
    content:'',
    date   :''
    
  
  })

  

  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const state     = store.getState();
  const user      = state.user
  const token     = state.token;
  const post      = state.editPost;
  const posts     = state.userPosts;
  
  
  const contentHandler = (value)=>
  {
    setPostData((prev)=>{
    return{
      ...prev,content:value
    }})
  }
  
  
  const handleFormSubmit = async(e)=>{
    e.preventDefault();
    try {
    
      console.log(postData)
  
    let lastName = ""
 
    console.log(post)
    console.log(token)
    const formData = new FormData();
    for(let value in postData)
    {
     formData.append(value,postData[value])
    }
    formData.append("image",postData.imageContent.name)
    formData.append("userId",user._id)
    
    formData.append("email",user.email)
    user.lastName==="no last name"?lastName="":lastName=user.lastName
 
    
    formData.append("author",user.firstName+" "+lastName)
     

   
 
   const newPost = await axios.post("http://localhost:4000/blog/v1/user/posts"
    ,formData,
    {headers:{
     "Content-Type":"multipart/form-data",
     "Authorization":`Bearer ${token}`}})
    
    let newPosts = [];
    
    posts.map((item)=>
    {
      newPosts.push(item)
    })

    newPosts.push(newPost.data)
 
    dispatch(setUserPosts({
      userPosts:newPosts
    }))
      navigate("/posts")
    } 
    catch (error) 
    {
      console.log(error) 
    }}
    
    
  
  
 
  return (
  <Container>
     

        <form onSubmit={handleFormSubmit}>
          <div className='post-container'>
                <div className='post-title'>
                  <label>Title</label>
                  <input name='title' 
                    
                    
                    onChange={e=>setPostData({...postData,title:e.target.value})}
                    
                  />
                  
                </div>
               <div className='post-sub-title'>
                <label>Subtitle</label>
                  <input name='subtitle' 
                    onChange={e=>setPostData({...postData,subtitle:e.target.value})}
                  
                    
                 
                  
                  />
                  
                </div>

                <div className='post-content-type'>
                    <label>Which domain you want to post?</label>
                    <select name='postType' 
                     onChange={e=>setPostData({...postData,postType:e.target.value})}
                     
                   
                     
                     >
                      <option value={"tech"}>TECH</option>
                      <option value={"business"}>BUSINESS</option>
                      <option value={"reviews"}>REVIEWS</option>
                    </select>
                    

                </div>
                <div className='post-content'>
                  <div className='post-content-editor'>
                  <ReactQuill 
                 theme='snow'
                
                 modules={quill.modules} 
                 name = "content"
                 onChange={contentHandler}
                 value={postData.content}
                />
                 
                  </div>
                
                   
                </div>
                <div className='post-image'>
                 <Dropzone
                   /*acceptedFiles = ".jpg,.jpeg,.png"*/
                   accept= ".jpg,.jpeg,.png"
                   multiple = {false}
                   name="imageContent"
                   
                   onDrop={(acceptedFiles)=>setPostData({...postData,imageContent:acceptedFiles[0]})}
                   
                 >
                   {({getRootProps,getInputProps})=>
                   
                   (
                       <div {...getRootProps()} className='post-image-dropzone'>
                             
                          <input {...getInputProps()}/>
                          {!postData.imageContent?(<p>Drag or Click here to insert Picture</p>):(<p>{postData.imageContent.name}</p>)}
                       </div>
                             


                   )}
                  
                  
                  </Dropzone>  
                </div>
                <div className='post-date'>
                    <input 
                    type="date"
                    name='date'
                    onChange={e=>setPostData({...postData,date:e.target.value})}
                    />
                   
                </div>
                <div className='post-submit-button'>
            <button type='submit'>Submit</button>
           </div>
              </div>
             




        </form>






    
  </Container>
  )}

export default NewPost
