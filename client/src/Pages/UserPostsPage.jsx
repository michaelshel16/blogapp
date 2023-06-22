import { Container } from '@mui/material'
import React from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const UserPostsPage = () => {
  return (
    <Container>
        <div className='user-posts-container'>
          <div className='user-posts-image'>

          </div>
          <div className='user-posts-title'>
           
          </div>
          <div className='user-posts-operations'>
            <div className='user-edit-icon'>
            <ModeEditOutlineOutlinedIcon/>
            </div>
            <div className='user-delete-icon'>
            <DeleteOutlineOutlinedIcon/>
            </div>
           
          </div>
        </div>
    </Container>
  )
}

export default UserPostsPage
