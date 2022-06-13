import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SingleComment.css'
 

const SingleComment = ({comment, bid, cdata, setCdata}) => { 
  //console.log(cdata)
  //  console.log(setCdata)
   const singleCdata = cdata;
  //console.log(bid)
  // const ids = [bid, reply.comments_id]
  const [index, setIndex] = useState(1)
  const [reply, setReply] = useState({
    id: 0,
    rtitle: '',
    rusername: '',
    rdepth: 1,
    comments_id: cdata.id,
  })

 
  const [replys, setReplys] = useState([]);
  //대댓글을 post 하고 get 했을 때 담을 배열
  const [rdata, setRdata] = useState([]);
  
  const real = rdata.filter((el) => el.comments_id === Number(reply.comments_id));


  const onDelete = async (e) => {
    //console.log(e.target.id)
    // if(window.confirm('정말 삭제 하시겠습니까?')){
    //   alert('삭제되었습니다')
    //   const num = Number(e.target.id)
    //   await axios.delete('/api/comment/:id', {data: {num}})
    //   .then((res) => {
    //     //console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log("client-err"+err) 
    //   })
    //   handleDelete(num)
    // }else{
    //   alert('취소합니다')
    // }
    //setRdata(info => info.filter(el => el.id !== id));
    // console.log(e.target.value)
    // console.log(cdata)
    const deleteNum = Number(e.target.value)
    // console.log(typeof(deleteNum))
    // console.log(singleCdata.filter((el) => el.id === deleteNum))
    setCdata(cdata.filter((el) => el.id !== deleteNum))
    await axios.delete('/api/comment/:id', {data: {deleteNum}})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log("client-err"+err) 
      })
  }


  const getReply = async() => {
    //console.log(comment.id)
    await axios.get('/api/getreply', {params: comment.id})
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
      ctitle: comment.ctitle,
      comments_id:comment.id,
      [name]: value,
    }));
    // console.log(name, value)
    // console.log(reply)
  };



  const addReply = (e) => {
    setIndex(index+1)
    submit();
  };

  //대댓글 post 요청하는 api
  const submit = () => {

    axios.post('/api/reply', reply)
    .then((res) => {
       console.log(reply)
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
        <button value={comment.id} onClick={onDelete}>삭제</button>
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
            // console.log(real)
            //console.log(el)
            // console.log(cdata)
            //console.log(comment)
            if(el.comments_id === comment.id){
              return(
                <div key={id} className='singleComment'>
                <div className='singleComment-title'>{el.rtitle}</div>
                <div className='singleComment-username'>{el.rusername}</div>
              </div>
              )
            }else{
              // console.log('===========')
              // console.log(el)
             
            }
         })}

      </div>
      </div>
    </div>
  )
}

export default SingleComment;