import React from 'react';
import './SingleComment.css'
 

const SingleComment = ({comment, inputs}) => { 
  //console.log(comment)
  

  return (
    <div className='singleComment'>
      <div className='singleComment-title'>{comment.ctitle}</div>
      <div className='singleComment-username'>{comment.cusername}</div>
    </div>
  )
}

export default SingleComment;