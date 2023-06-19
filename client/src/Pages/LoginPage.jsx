import React, { useState } from 'react';
import "./LoginPage.css";
import axios from "axios";
import { Formik } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setLogin} from "../State/index.jsx";


const loginSchema = yup.object().shape({
  email:yup.string().email("Invalid email").required("required"),
  password:yup.string().required("required")
});

const initialValuesLogin = {

  email:'',
  password:''

}



const LoginPage = () => {
  const [loggedInResponse,setloggedInResponse] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async(values,onSubmitProps)=>
  { 
    axios.post("http://localhost:4000/blog/v1/login",values,
    {
      headers:{"Content-type":"application/json"}
    }).then((res)=>
    { 
       dispatch(setLogin({
          user:res.data.user,
          token:res.data.token

       }))
    })
      
    if(loggedInResponse)
    {
      
      navigate("/home")
    }
  
    
    onSubmitProps.resetForm()
    



  }
  
  

  return (

    <Formik 
       onSubmit={handleFormSubmit}
       initialValues = {initialValuesLogin}
       validationSchema={loginSchema}
    >

      {({
         values,
         errors,
         touched,
         handleBlur,
         handleChange,
         handleSubmit,
         setFieldValue,
         resetForm
       })=>(
        <div className='login-container' >
        <form className='login-form' onSubmit={handleSubmit}>

          <div className='email-input'>
          <label>
              Email
           </label>
          <input type = "text" placeholder='Enter your email' 
          onBlur={handleBlur} 
          onChange={handleChange}
          value={values.email}
          name='email'
          />
          {Boolean(touched.email)&&Boolean(errors.email)?
          <div className='errors'>{errors.email}</div>:''}
          </div>
            <div className='password-input'>
            <label>
              password
             </label>
             <input type='text' placeholder='Enter your password' 
             onBlur={handleBlur}
             onChange={handleChange}
             value={values.password}
             name='password'/>
             {Boolean(touched.password)&&Boolean(errors.password)?
             <div className='errors'>{errors.password}</div>:''}
            </div>
            <button type='submit'>Login</button>
            
             
        </form>
    
  </div>


       )}
    
    </Formik>
  )
}

export default LoginPage
