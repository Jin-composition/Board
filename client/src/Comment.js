import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.css';
import SingleComment from './SingleComment';


function Comment({id, cdata}) {
  console.log(cdata)

  const [comment, setComment] = useState({
    id: id,
    title: '',
    username: '',
    cdepth: 1
  })
  const [comments, setComments] = useState([]);
  //const [cdata, setCdata] = useState([]);


  const addComment = (e) => {
    e.preventDefault();
    setComments((prev) => {
      return ([...prev, {
        id: comment.id,
        ctitle: comment.title,
        cusername: comment.username,
        cdepth: 1,
        board_id: comment.id,
      }]
    )})

    axios.post('/api/comment', comment)
    console.log(comment)
    .then((res) => {
      console.log(res)
      setComment(res.data);
    })
    .catch((err) => {
      console.log('comment-err ' + err)
    })
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

 
  useEffect(() => {
    // axios.get('/api/getcomment', {params: id})
    // .then((res) => {
    //   console.log(res.data)
    //   setCdata(res.data)
    // })
    // .catch((err) => {
    //   console.log('comment-err ' + err)
    // })
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
        {/* {comments.map((el, id) => {
          return(
            <SingleComment comment={el} key={id} />
          )
        })} */}
        {/* {console.log('==========')}
        {console.log(cdata)} */}
        {/* <div className='singleComment'>
            <div className='singleComment-title'>{cdata[0].ctitle}</div>
            <div className='singleComment-username'>{cdata[0].cusername}</div>
          </div>
          <div className='singleComment'>
            <div className='singleComment-title'>{cdata[1].ctitle}</div>
            <div className='singleComment-username'>{cdata[1].cusername}</div>
          </div> */}

        {cdata.map((el) => {
          <div className='singleComment'>
            <div className='singleComment-title'>{el.ctitle}</div>
            <div className='singleComment-username'>{el.cusername}</div>
          </div>
        })}
      </div>
    </div>
   
  );
}

export default Comment;