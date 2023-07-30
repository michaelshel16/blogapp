import React from 'react';
import "./Navbar.css";
import logo from "../assets/bloglogo.png";
import { useSelector } from 'react-redux';
import { setLogin,setLogout } from '../State/index.jsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
const navigate = useNavigate();
const dispatch = useDispatch(); 
const user = useSelector((state)=>state.user)
console.log(user);
  return (

    <div className='navbar-container'>
      <div className='navbar-logo'>
         <img src= {logo} alt = "Logo not available"/>

      </div>
      <div className='navbar-specifics'>
         <div className='navbar-tech' onClick={()=> navigate("posts/tech")}>
           TECH
         </div>
         <div className='navbar-business' onClick={()=>navigate("posts/business")}>
           BUSINESS
         </div>
         <div className='navbar-reviews' onClick={()=>navigate("posts/reviews")}>
            REVIEWS
         </div>
      </div>
      <div className='navbar-authentication'>
          <div className='navbar-login'>
            {user?<span >{"Hi  "+ user.firstName}</span>
            :<span onClick={()=>{navigate("/login")}}>login</span>} 
           </div>
          <div className='navbar-register'>
           {user?<span onClick={()=>{navigate("/posts")}}>Posts</span>:<span onClick={()=>{navigate("/register") ,dispatch(setLogin(null))}}>Register</span>}
          </div>
          <div className='navbar-logout'>
           {user?<span onClick={()=>{navigate("/"),dispatch(setLogout())}}>Logout</span> :""}
          </div>
      </div>
      
    </div>
  )
}

export default Navbar
