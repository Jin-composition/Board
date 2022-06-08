import React from 'react';
import './SingleComment.css'
import axios from 'axios';

const SingleComment = ({comment, inputs}) => { 
  console.log(inputs)
  

  return (
    <div className='singleComment'>
      <div className='singleComment-title'>{inputs.ctitle}</div>
      <div className='singleComment-username'>{inputs.cusername}</div>
    </div>
  )
}

export default SingleComment;