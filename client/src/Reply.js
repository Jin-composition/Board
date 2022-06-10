import React, { useState } from 'react';
import axios from 'axios';

const Reply = ({id}) => {
  const cid = id
  const [comment, setComment] = useState({
    id: 0,
    ctitle: '',
    cusername: '',
    cdepth: 1,
    board_id: cid,
  })
  const [comments, setComments] = useState([]);

  const addComment = (e) => {
    e.preventDefault();
    setComments((prev) => {
      return ([...prev, {
        id:comment.id,
        ctitle: comment.ctitle,
        cusername: comment.cusername,
        cdepth: 1,
        board_id: cid,
      }]      
    )})

    axios.post('/api/comment', comment)
    .then((res) => {
      console.log(comment)
      console.log(res)
      setComment(res.data);
    })
    .catch((err) => {
      console.log('comment-err ' + err)
    })
    setComment({
      ctitle: '',
      cusername: ''
    })
    e.target.reset();
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
    <form className='comment-form' onSubmit={addComment}>
        <textarea className='comment-title'
          onChange={handleInputChange}
          name='ctitle'
          value={comment.ctitle}
          placeholder="댓글을 작성해 주세요"
        />
          <textarea className='comment-username'
          onChange={handleInputChange}
          name='cusername'
          value={comment.cusername}
          placeholder="작성자"
        />
        <button className='comment-button' type='submit'>
          게시
        </button>
      </form>
  )
}

export default Reply;