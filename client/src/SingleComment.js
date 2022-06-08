import React from 'react';
import './SingleComment.css'

const SingleComment = ({comment}) => { 
   console.log(comment)
  return (
    <div className='singleComment'>
      <div className='singleComment-title'>{comment.title}</div>
      <div className='singleComment-username'>{comment.username}</div>
    </div>
  )
}

export default SingleComment;