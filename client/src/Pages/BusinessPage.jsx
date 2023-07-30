import React from 'react';
import DomainPage from '../components/DomainPage';
import { useSelector } from 'react-redux';

const BusinessPage = () => {
  
  const posts = useSelector((state)=>state.businessPosts)
  
  return (
    <div>
      <DomainPage posts={posts}/>
    </div>
  )
}

export default BusinessPage
