import { createSlice } from "@reduxjs/toolkit";


const initialState = 
{
  
   user:null,
   post:null,
   editPostId:"",
   userPosts:[],
   techPosts:[],
   businessPosts:[],
   reviewsPosts:[],
   token:null,
}

 const authSlice = createSlice({

name:"auth",
initialState,
reducers:{

    setTechPosts:(state,action)=>
    {
       state.techPosts = action.payload.techPosts
    },
    setBusinessPosts:(state,action)=>
    {
       state.businessPosts = action.payload.businessPosts
    },
    setReviewsPosts:(state,action)=>
    {
       state.reviewsPosts = action.payload.reviewsPosts
    },
     setLogin:(state,action)=>
    {
      
        state.userPosts  = action.payload.userPosts
        state.user       = action.payload.user
        state.token      = action.payload.token

    },
    setPost:(state,action)=>
    {
       state.post = action.payload.post
    },
    setEditPost:(state,action)=>
    {
      state.editPostId = action.payload.editPostId
    },
    
    setLogout:(state,action)=>
    {

        state.user      = initialState.user
        state.token     = initialState.token
        state.userPosts = initialState.userPosts
    }
}


});

export const 
{setMode,setLogin,setLogout,
   setTechPosts,setBusinessPosts,
   setReviewsPosts,setPost,setEditpost} = authSlice.actions;

const authReducer = authSlice.reducer

export default authReducer;


