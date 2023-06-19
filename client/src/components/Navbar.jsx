import React from 'react';
import "./Navbar.css";
import logo from "../assets/logo.png";
import { useSelector } from 'react-redux';
import { setLogin,setLogout } from '../State/index.jsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
const navigate = useNavigate();
const dispatch = useDispatch(); 
const user = useSelector((state)=>state.user.user)
console.log(user);
  return (

    <div className='navbar-container'>
      <div className='navbar-logo'>
         <img src= {logo} alt = "Logo not available"/>

      </div>
      <div className='navbar-specifics'>
         <div className='navbar-tech'>
           TECH
         </div>
         <div className='navbar-business'>
           BUSINESS
         </div>
         <div className='navbar-reviews'>
            REVIEWS
         </div>
      </div>
      <div className='navbar-authentication'>
          <div className='navbar-login'>
            {user?<span>{"Hi  "+user.firstName}</span>:<span onClick={()=>{navigate("/login")}}>login</span>} 
           </div>
          <div className='navbar-register'>
           {user?<span onClick={()=>{navigate("/createpost")}}></span>:<span onClick={()=>{navigate("/register"),dispatch(setLogin(null))}}>Register</span>}
          </div>
          <div className='navbar-logout'>
           {user?<span onClick={()=>{navigate("/home"),dispatch(setLogout())}}>Logout</span> :""}
          </div>
      </div>
      
    </div>
  )
}

export default Navbar
