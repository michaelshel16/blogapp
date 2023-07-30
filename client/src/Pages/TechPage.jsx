import React from 'react';
import DomainPage from '../components/DomainPage';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const TechPage = () => {

 const posts  = useSelector((state)=> state.techPosts)

    return (
    <div>
      <DomainPage posts = {posts}/>
    </div>
  )
}

export default TechPage
