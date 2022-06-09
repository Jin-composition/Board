import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.css';
import SingleComment from './SingleComment';


function Comment({id}) {
  const cid = id
  const [cdata, setCdata] = useState([]);
  const [comment, setComment] = useState({
    id: 0,
    ctitle: '',
    cusername: '',
    cdepth: 1,
    board_id: cid,
  })
  const [comments, setComments] = useState([]);
  //console.log(comment)

  const getComment = async() => {
    await axios.get('/api/getcomment', {params: id})
   .then((res) => {
     //console.log(res.data)
     setCdata(res.data)
   })
   .catch((err) => {
     console.log('comment-err ' + err)
   })
 }

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

 
  useEffect(() => {
    getComment();
  },[])


  return (
    <div className='comment'>
      <br />
      <p>댓글</p>
      <hr />
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
      <div className='renderComment'>
        {comments.map((el, id) => {
          return(
            <SingleComment comment={el} key={id} />
          )
        })}
        {/* {console.log('==========')}
        {console.log(cdata)} */}

      {cdata.length > 0 ? cdata.map((el) => (
          <div className='singleComment'>
            <div className='singleComment-title'>{el.ctitle}</div>
            <div className='singleComment-username'>{el.cusername}</div>
          </div>
        )) : '해당 게시물엔 댓글이 없습니다.' }
        
      </div>
    </div>
   
  );
}

export default Comment;