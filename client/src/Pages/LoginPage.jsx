import React, { useEffect, useState } from 'react';
import "./LoginPage.css";
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setLogin,setUserPosts} from "../State/index.jsx";
import { signInWithGoogle } from '../components/Firebase';







const LoginPage = () => {
  const [email,setEmail]       = useState("");
  const [password,setPassword] = useState("");
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  

  const handleFormSubmit = async()=>
  {  
    axios.post("http://localhost:4000/blog/v1/login",values,
    {
      headers:{"Content-type":"application/json"}
    }).then((res)=>
    {  
       const loggedInResponse = res.data;
       console.log(loggedInResponse);
       dispatch(setLogin({
        user :loggedInResponse.user,
        token:loggedInResponse.token,
        
      }))

       if(loggedInResponse)
       { axios.get(`http://localhost:4000/blog/v1/${loggedInResponse.user._id}/posts`,
       {headers:{"Authorization":`Bearer ${loggedInResponse.token}`}}
     
     ).then((res)=>
     { console.log(res.data);
       
       dispatch(setUserPosts({
        userPosts:res.data
       }))
     })
     navigate("/")
        
        
      }
      
    })
     
     const passwordReset = async()
   
      
  onSubmitProps.resetForm()
     


  }

  const googleLogin = ()=>
  {
    signInWithGoogle()
    .then((result)=>
    {
      const UserCredentials = {
        email:result.user.email,
        tokenId:result.user.getIdToken()
      }

      axios.post("http://localhost:4000/blog/v1/login",UserCredentials,
      {
      headers:{"Content-type":"application/json"}
    }).then((res)=>
    {
      const loggedInResponse = res.data;
       console.log(loggedInResponse);
       dispatch(setLogin({
        user :loggedInResponse.user,
        token:loggedInResponse.token,
        
      }))

       if(loggedInResponse)
       { axios.get(`http://localhost:4000/blog/v1/${loggedInResponse.user._id}/posts`,
       {headers:{"Authorization":`Bearer ${loggedInResponse.token}`}}
     
     ).then((res)=>
     { console.log(res.data);
       
       dispatch(setUserPosts({
        userPosts:res.data
       }))
     })
     navigate("/")
        
        
      }
      
    })

    })  
  }
  

  return (
    <div>
      
        <div className='login-container' >
        <form className='login-form' onSubmit={handleFormSubmit}>

          <div className='email-input'>
          <label>
              Email
           </label>
          <input type = "text" placeholder='Enter your email' 
           onChange={e=> setEmail(e.target.value)}
          name='email'
          />
          
          </div>
            <div className='password-input'>
            <label>
              password
             </label>
             <input type='text' placeholder='Enter your password' 
             onChange={e=> setPassword(e.target.value)}
             name='password'/>
             
            </div>
            <div className='submit-button'>
            <button type='submit'>Login</button>
            </div>
            
          
            
            
             
        </form>
        <div className='google-login-signin'>
        <button type='submit' onClick={()=>googleLogin()}>
              Sign Up with Google <FcGoogle/></button>
        </div>
    
  </div>


      
    <div className='forgot-password'>
       <h4>Forgot password</h4> 
       <span onClick={()=>{navigate("/passwordReset",{state:email})}} 
       className='forgot-password-link'>
        click here</span>
    </div>
    </div>

    
  )
}

export default LoginPage
