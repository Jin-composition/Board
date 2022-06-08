import React, { useCallback, useState } from 'react';
import axios from 'axios';
import './Comment.css';
import SingleComment from './SingleComment';


function Comment() {

  const [comment, setComment] = useState({
    title: '',
    username: ''
  })
  const [comments, setComments] = useState([]);

  const renderComments = comments.map((el, id) => {
    return(
      <SingleComment comment={el} key={id} />
    )
  })

  const addComment = (e) => {
    e.preventDefault();
    setComments((prev) => {
      return ([...prev, {
        title: comment.title,
        username: comment.username
      }]
    )})

    // axios.post('/api/comment', )
    
    setComment({
      title: '',
      username: ''
    })
  };

  const handleChange = (name, value) => {
    setComment((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // console.log(name, value)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };



  return (
    <div className='comment'>
      <br />
      <p>댓글</p>
      <hr />
      {/* Comment Lists */}

      {/* Root Comment Form */}

      <form className='comment-form' onSubmit={addComment}>
        <textarea className='comment-title'
          onChange={handleInputChange}
          name='title'
          value={comment.title}
          placeholder="댓글을 작성해 주세요"
        />
          <textarea className='comment-username'
          onChange={handleInputChange}
          name='username'
          value={comment.username}
          placeholder="작성자"
        />
      
        <button className='comment-button' type='submit'>
          댓글입력
        </button>
      </form>
      <div className='renderComment'>
        {renderComments}
      </div>
    </div>
   
  );
}

export default Comment;