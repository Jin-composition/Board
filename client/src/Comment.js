import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.css';
import SingleComment from './SingleComment';


function Comment() {

  const [comment, setComment] = useState({
    title: '',
    username: '',
    cdepth: 1
  })
  const [comments, setComments] = useState([]);

  // const renderComments = comments.map((el, id) => {
  //   return(
  //     <SingleComment comment={el} key={id} />
  //   )
  // })



  const addComment = (e) => {
    e.preventDefault();
    setComments((prev) => {
      return ([...prev, {
        title: comment.title,
        username: comment.username,
        cdepth: 1
      }]
    )})

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

  const apiComment = () => axios.post('/api/comment', comment)
  .then((res) => {
    setComment(res.data);
  })
  .catch((err) => {
    console.log('comment-err ' + err)
  })

  useEffect(() => {
    apiComment();
  },[])


  return (
    <div className='comment'>
      <br />
      <p>댓글</p>
      <hr />
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
          게시
        </button>
      </form>
      <div className='renderComment'>
        {comments.map((el, id) => {
          return(
            <SingleComment comment={el} key={id} />
          )
        })}
      </div>
    </div>
   
  );
}

export default Comment;