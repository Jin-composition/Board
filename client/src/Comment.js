import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.css';
import SingleComment from './SingleComment';


function Comment({id, handleDelete}) {
  const bid = id
  
  const [index, setIndex] = useState(1);
  const [comment, setComment] = useState({
    id: 0,
    ctitle: '',
    cusername: '',
    cdepth: 1,
    cgroup: 1,
    board_id: Number(bid),
  })
  const [comments, setComments] = useState([]);
  //댓글을 post 하고 get 했을 때 담을 배열
  const [cdata, setCdata] = useState([]);


  //console.log(comment)


  //댓글 가져오는 api
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


  //게시 버튼 눌렀을 때 id값 1씩 증가하고 api 보냄
  const addComment = () => {
    setIndex(index+1)
    submit();
    //console.log(comment)
    // e.target.reset();
  };

  //댓글 post 요청하는 api
  const submit = () => {
    console.log(comments)

    axios.post('/api/comment', comment)
    .then((res) => {
      console.log(comment)
      console.log(res.data)
      if(res.data === 'ok'){
        //alert('ok')
        setCdata([...cdata, comment])
      }else{
        //alert('fail')
      }
      // setComment(res.data);
    })
    .catch((err) => {
      console.log('comment-err ' + err)
    })
    setComment({
      ctitle: '',
      cusername: ''
    })
  }


  const handleInputChange = (e) => {
    const num = cdata.length+1;
    //console.log(num);
    const { name, value } = e.target;
    setComment((prevValues) => ({
      ...prevValues,
      id: num+1,
      [name]: value,
    }));
    //console.log(name, value)
  };

 
  useEffect(() => {
    getComment();
  },[])

  return (
    <div className='comment'>
      <br />
      <p>댓글</p>
      <hr />
      <div className='comment-form' >
        <textarea className='comment-title'
          onChange={handleInputChange}
          name='ctitle'
          value={comment.ctitle}
          placeholder="댓글을 작성해 주세요"
        />
          <input className='comment-username'
          onChange={handleInputChange}
          name='cusername'
          value={comment.cusername}
          placeholder="작성자"
        />
        <button className='comment-button' type='submit' onClick={() => addComment()}>
          게시
        </button>
      </div>
      <div className='renderComment'>
        {cdata?.length > 0 ? cdata.map((el, id) => {
          return(
            <SingleComment comment={el} key={id} handleInputChange={handleInputChange} bid={bid} handleDelete={handleDelete} cdata={cdata}/>
          )
        }) : '해당 게시물엔 댓글이 없습니다.' }
        {/* {console.log('==========')}
        {console.log(cdata)} */}

      {/* {cdata.length > 0 ? cdata.map((el, id) => (
          <div key={id} className='singleComment'>
            <div className='singleComment-title'>{el.ctitle}</div>
            <div className='singleComment-username'>{el.cusername}</div>
          </div>
        )) : '해당 게시물엔 댓글이 없습니다.' } */}
        
      </div>
    </div>
   
  );
}

export default Comment;