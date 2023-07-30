import React from 'react';
import DomainPage from '../components/DomainPage';
import { useSelector } from 'react-redux';

const ReviewsPage = () => {
     
    const  posts = useSelector((state)=> state.reviewsPosts)

    return (
    <div>
      <DomainPage posts={posts}/>
    </div>
  )
}

export default ReviewsPage
