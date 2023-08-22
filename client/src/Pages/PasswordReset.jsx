import React, { useState } from 'react';
import "./PasswordReset.css";
import { MuiOtpInput } from 'mui-one-time-password-input'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const PasswordReset = () => {

   const location                             = useLocation();
   const navigate                             = useNavigate();
   const Otp                                  = location.state.Otp;
   const email                                = location.state.email;
   const [password,setpassword]               = useState("")
   const [otp,setotp]                         = useState('');
   const [verified,setverified]               = useState(false);
   const [passwordCheck,setpasswordCheck]     = useState(true);
   const [newpassword,setnewpassword]         = useState("");
   const [confirmpaswword,setconfirmpassword] = useState("");
   
    

   const handleOtpSubmit = (e)=>
   {
     e.preventDefault();

     Otp===otp?setverified(true):setverified(false)

   }

   const handlePasswordSubmit = async(e) =>
   { e.preventDefault()
    password!==confirmpaswword?setpasswordCheck(false):setpasswordCheck(true)
    try 
    {
     const response = await axios.patch("http://localhost:4000/blog/v1/passwordreset/user",
    {
      email:email,
      password:password
    })
    response.status===200?navigate("/login"):navigate("/home")
    } 
    catch (error) 
    {
        console.log(error);
    }
    
   }
  return (
    <div className='reset-container'>
      {
          verified?
          <div className='set-password'>
            <input placeholder='Enter new password' onChange={(event)=>{setnewpassword(event.target.value)}}/>
            <input placeholder='Confirm password' onChange={(event)=>{setconfirmpassword(event.target.value)}}/>
            
            {Boolean(passwordCheck)?<div>{""}</div>:
              <div>password doesn't match</div>}
              <button onClick={(e)=>handlePasswordSubmit(e)}>SUBMIT</button>
            
          </div>:
           <div className='otp-input'>
            <h2>Enter OTP</h2>

           <MuiOtpInput display= 'flex' gap= {3} 
             length={4}
             value={otp}
            className='otp-input-box'
            onChange={(newValue)=>{setotp(newValue)}}  />

           
           <button onClick={(e)=>handleOtpSubmit(e)}>SUBMIT</button>
           </div>
      }
      
      
      </div>
      
       

      
      
      
   
  )
}

export default PasswordReset
