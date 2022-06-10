import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SingleComment.css'
 

const SingleComment = ({comment, bid, cdata}) => { 
  console.log(comment)
 
  //console.log(bid)
  // const ids = [bid, reply.comments_id]
  const [index, setIndex] = useState(1)
  const [reply, setReply] = useState({
    id: 0,
    rtitle: '',
    rusername: '',
    rdepth: 1,
    comments_id: bid,
  })

 
  const [replys, setReplys] = useState([]);
  //대댓글을 post 하고 get 했을 때 담을 배열
  const [rdata, setRdata] = useState([]);
  
  //console.log(reply.id)
  const real = rdata.filter((el) => el.comments_id === Number(reply.comments_id));
  
  const ids = [bid, 1];
  const getReply = async() => {
    await axios.get('/api/getreply', {params: bid})
   .then((res) => {
    //console.log(res.data)
    setRdata(res.data)
   })
   .catch((err) => {
     console.log('comment-err ' + err)
   })
 }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const num = rdata.length+1;
    //console.log(num);
    setReply((prevValues) => ({
      ...prevValues,
      id: num+1,
      [name]: value,
    }));
    // console.log(name, value)
  };



  const addReply = (e) => {
    setIndex(index+1)
    submit();
  };

  //대댓글 post 요청하는 api
  const submit = () => {

    axios.post('/api/reply', reply)
    .then((res) => {
       //console.log(reply)
      // console.log(res)
      if(res.data === 'ok'){
        //alert('ok')
        setRdata([...rdata, reply])
      }else{
        //alert('fail')
      }
      // setComment(res.data);
    })
    .catch((err) => {
      console.log('comment-err ' + err)
    })

    setReplys({
      rtitle: '',
      rusername: ''
    })
  }


  useEffect(() => {
    getReply();
  },[])


  return (
    <div className='sc'>
      
      {/* {console.log(comment.length)} */}
      {comment ?  <div className='singleComment'>
        <div className='singleComment-title'>{comment.ctitle}</div>
        <div className='singleComment-username'>{comment.cusername}</div>
        {/* <button id={1} onClick={onDelete}>삭제</button> */}
        </div> : ''
      }
      
      <div className='scsc'>
        <br />
        <div className='font'>대댓글</div>
        <hr />
        <div className='comment-form'>
          <textarea className='comment-title'
            onChange={handleInputChange}
            name='rtitle'
            value={reply.rtitle}
            placeholder="대댓글을 작성해 주세요"
          />
            <textarea className='comment-username'
            onChange={handleInputChange}
            name='rusername'
            value={replys.rusername}
            placeholder="작성자"
            />
           
          <button className='comment-button' type='submit' onClick={() => addReply()}>
            게시
          </button>
        </div>
        <div className='renderComment'>
          {/* {console.log(typeof(rdata[0].comments_id))}
          {console.log(Number(reply.comments_id))} */}
          {/* {console.log(rdata[0].comments_id === Number(reply.comments_id))} */}
          
          {/* {console.log('rdata' + rdata[0].comments_id)} */}
          {/* {console.log(real)} */}
          {real.map((el, id) => {
            if(el.comments_id === comment.id){
              return(
                <div key={id} className='singleComment'>
                <div className='singleComment-title'>{el.rtitle}</div>
                <div className='singleComment-username'>{el.rusername}</div>
              </div>
              )
            }else{
              console.log('===========')
              console.log(el)
             
            }
         })}
         {/* {(real.filter((el) => el.comments_id === Number(reply.comments_id))).map((el, id) => {
            return(
              <div className='singleComment'>
              <div className='singleComment-title'>{el.rtitle}</div>
              <div className='singleComment-username'>{el.rusername}</div>
            </div>
            )
         })} */}
         {/* {rdata.map((el, id) => {
            return(
              <div className='singleComment'>
              <div className='singleComment-title'>{el.rtitle}</div>
              <div className='singleComment-username'>{el.rusername}</div>
            </div>
            )
         }).filter((el) => el.comments_id !== reply.comments_id)} */}

      </div>
      </div>
    </div>
  )
}

export default SingleComment;