import React, { useState } from 'react';
import "./RegisterPage.css";
import {Formik} from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const registerSchema = yup.object().shape({
  firstName: yup.string().required("required") ,
  lastName:yup.string().required("required"),
  email:yup.string().email("Invalid email").required("required"),
  password:yup.string().required("required")
 });

  

  const initialValuesRegister = 
  {
    firstName:'',
    lastName:'',
    email:'',
    password:''
  }

const RegisterPage = () => {
     
    const navigate = useNavigate();
    const dispatch =  useDispatch();

    const handleFormSubmit = async(values,onSubmitProps) =>
    {  
       console.log(values);
      
     
      
      axios.post("http://localhost:4000/blog/v1/register",values )
      .then((res)=>
      {
        console.log(res);
      })

      
      onSubmitProps.resetForm();

     navigate("/home");
      
      
    }

   




  return (
    <div className='register-container'>
      <Formik
         onSubmit={handleFormSubmit}
         initialValues={initialValuesRegister}
         validationSchema={registerSchema}
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


          <form className='register-form' onSubmit={handleSubmit}>
            
        <div className='user-details'>
          
           <div className='first-name-input-box'>
           <input name='firstName' placeholder='first name' 
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.firstName}
             />
             {Boolean(touched.firstName)&&Boolean(errors.firstName)?
             <div className='errors'>{errors.firstName}</div>:''}
           </div>
           <div className='last-name-input-box'>
           <input name='lastName' placeholder='last name'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.lastName}
             />
             {Boolean(touched.lastName)&&Boolean(errors.lastName)?
             <div className='errors'>{errors.lastName}</div>:''}
           </div>
           <div className='email-input-box'>
           <input name = 'email'placeholder='email'
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.email}
           />
           {Boolean(touched.email)&&Boolean(errors.email)?
             <div className='errors'>{errors.email}</div>:''}
           </div>
           <div className='password-input-box'>
           <input name='password' placeholder='password'
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.password}
           />
           {Boolean(touched.password)&&Boolean(errors.password)?
             <div className='errors'>{errors.password}</div>:''}
           </div>
           <div className='submit-button'>
            <button type='submit'>Submit</button>
           </div>
           
        </div>
         
      </form>



        )}
        
      </Formik>
    </div>
  )
}

export default RegisterPage