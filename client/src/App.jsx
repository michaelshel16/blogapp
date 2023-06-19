import { useState } from 'react';
import  "./index.css";
import "./App.css"; 
import { Route,Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import Navbar from './components/Navbar.jsx';
import RegisterPage from "./Pages/RegisterPage.jsx";
import NewPost from './Pages/NewPost';
import BlogCard from './components/BlogCard';
import Footer from './components/Footer';

function App() {
  

  return (
   <div className='app'>
         <Navbar/>
         

     <Routes>
          <Route path ='/home'        element={<HomePage/>}/>
          <Route path ='/login'   element={<LoginPage/>}/>
          <Route path ='/register'element={<RegisterPage/>}/>
          <Route path ='/createpost' element={<NewPost/>}/>

     </Routes>
          <Footer/>

   </div>
  )
}

export default App
