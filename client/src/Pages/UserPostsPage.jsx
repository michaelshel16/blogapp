import { Container } from '@mui/material'
import React, { useEffect } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import "./UserPostsPage.css";
import { useSelector } from 'react-redux';

import axios from 'axios';
import { setPost,setUserPosts,setEditPost} from '../State';
import EditPost from './EditPost';
import PostPage from '../components/PostPage';



const UserPostsPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user     = useSelector((state)=> state.user)
    const token    = useSelector((state)=> state.token)
    const posts    = useSelector((state)=> state.userPosts)
    
    console.log(token);


    const handleEdit = async (post)=>
    {
      
      dispatch(setEditPost({
        editPost:post}
      ))
      navigate("/editpost")
    }
   
    
     const handleDelete = async (post)=>
     { const postId = post._id
      console.log(post._id)
      axios.delete(`http://localhost:4000/blog/v1/${postId}/post`,
      {headers:{Authorization:`Bearer ${token}`}}
      
     
     ).then((res)=>
     {
      console.log(res);
     }
    )

    let array = [];
    array     = posts.filter((post)=>
    {
        return post._id !== postId
    })
    dispatch(setUserPosts({
        
      userPosts:array
    }))

  }

     
    
    
    
    
   
  return (

     
    
   
    <Container>
        <div className='user-posts-create'>
          <button onClick={()=>navigate("/createpost")}>CreatePost</button>
        </div>
        
        <div className='user-posts'>
        {posts?
         posts.map((item,index)=>
         (
          <div className='user-posts-container' key={index}>
          <div className='user-posts-image' onClick={()=> {
            navigate("/post"),dispatch(setPost({post:item}))}}>
            <img src={`http://localhost:4000/assets/${item.image}`}
            alt='no image available'/>
          </div>
          <div className='user-posts-title'  onClick={()=> {
            navigate("/post"),dispatch(setPost({post:item}))}}>
          {item.title}
          </div>
          <div className='user-posts-operations'>
            <div className='user-edit-icon' onClick={()=>{handleEdit(item)}}>
            <ModeEditOutlineOutlinedIcon />
            </div>
            <div className='user-delete-icon' onClick={()=>{handleDelete(item)}}>
            <DeleteOutlineOutlinedIcon />
            </div>
           
          </div>
        </div>

          
         )

         ):<div><h1>No posts found</h1></div>
         }
        </div>
         
        
    </Container>
    
  )
}

export default UserPostsPage
