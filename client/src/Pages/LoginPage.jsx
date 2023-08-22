import React, { useEffect, useState } from 'react';
import "./LoginPage.css";
import axios from "axios";
import {FcGoogle} from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setLogin,setUserPosts} from "../State/index.jsx";
import { signInWithGoogle } from '../components/Firebase';







const LoginPage = () => {
  const [email,setEmail]         = useState("");
  const [password,setPassword]   = useState("");
  const [isclicked,setisclicked] = useState(false); 
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

  const handlePasswordReset = async () =>
  { 
    
    
    try 
    {
      const user = await axios.post("http://localhost:4000/blog/v1/finduser",
      {email:email})
  
      if(user)
      {
        const Otp = Math.floor(1000+Math.random()*9000);
        axios.post("http://localhost:4000/blog/v1/passwordverify/user",
        {
          email:email,
          Otp:Otp
        })
        navigate("/passwordreset",{state:{Otp:Otp,email:email}})
      }
      else
      {
        alert("User not found")
      }
    
  } catch (error)
   {
      console.log(error);
  }
    
   
  }
  

  return (
    <div>
         {
          isclicked?
          <div className='reset-email'>
        <input
         onChange=
        {e=>setEmail(e.target.value)} placeholder='Enter your email Id'/>
        <div>
        <button onClick={()=>{handlePasswordReset()}}>SUBMIT</button>
      </div>
      </div>:
      <div>
      <div className='login-container' >
       <div className='login-form-container'>
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
           <div className='forgot-password'>
           <h4>Forgot password</h4> 
           <span onClick={()=> {setisclicked(true)}} 
           className='forgot-password-link'>
             click here</span>
            </div>
     
     
 </div>
 
     <div className='google-login-signin'>
     <button type='submit' onClick={()=>{googleLogin()}}>
           Sign In with Google <FcGoogle/></button>
     </div>
    
 </div>
      </div>
         }
         
        


      
    
    </div>

    
  )
}

export default LoginPage
