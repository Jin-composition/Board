import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/SingleComment.css';
import CommentInput from './CommentInput';

const SingleComment = ({ comment, bid, cdata, setCdata, getComment }) => {
  const [index, setIndex] = useState(1);
  const [reply, setReply] = useState({
    id: 0,
    rtitle: '',
    rusername: '',
    rdepth: 1,
    comments_id: 0,
    ctitle: '',
  });

  const [replys, setReplys] = useState([]);
  //대댓글을 post 하고 get 했을 때 담을 배열
  const [rdata, setRdata] = useState([]);

  window.localStorage.setItem('name', '김구름');
  const name = window.localStorage.getItem('name');

  const onDelete = async (e) => {
    //console.log(name)
    if (name === comment.cusername) {
      const deleteNum = Number(e.target.value);
      await axios
        .delete('/api/comment/:id', { data: { deleteNum } })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log('client-err' + err);
        });
      getComment();
    } else {
      alert('삭제 권한이 없습니다.');
    }
  };

  const getReply = async () => {
    //console.log(comment.id)
    await axios
      .get('/api/getreply', {
        params: {
          id: Number(bid),
          idid: Number(comment.id),
        },
      })
      .then((res) => {
        //console.log(res.data)
        setRdata(res.data);
      })
      .catch((err) => {
        console.log('comment-err ' + err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const num = rdata.id + 1;
    //console.log(rdata.length)
    //console.log(num);
    setReply((prevValues) => ({
      ...prevValues,
      id: num + 1,
      ctitle: comment.ctitle,
      comments_id: comment.id,
      [name]: value,
    }));
    // console.log(name, value)
    // console.log(reply)
  };

  const onChange = (e) => {
    alert('gg');
  };

  const addReply = (e) => {
    setIndex(index + 1);
    setReply({
      comments_id: comment.id,
    });
    submit();
    getReply();
  };

  //대댓글 post 요청하는 api
  const submit = (e) => {
    axios
      .post('/api/reply', reply)
      .then((res) => {
        console.log(reply);
        // console.log(res)
        if (res.data === 'ok') {
          //alert('ok')
          setRdata([...rdata, reply]);
        } else {
          //alert('fail')
        }
        // setComment(res.data);
      })
      .catch((err) => {
        console.log('comment-err ' + err);
      });

    setReplys({
      rtitle: '',
      rusername: '',
    });
  };

  useEffect(() => {
    getReply();
  }, []);

  const real = rdata.filter((el) => el.comments_id === comment.id);

  return (
    <div className='sc'>
      {/* {console.log(comment.length)} */}
      {comment ? (
        <div className='singleComment'>
          <div className='singleComment-title'>{comment.ctitle}</div>
          <div className='singleComment-username'>{comment.cusername}</div>
          <button className='upBtn' value={comment.id} onClick={onChange}>
            수정
          </button>
          <button value={comment.id} onClick={onDelete}>
            삭제
          </button>
        </div>
      ) : (
        ''
      )}
      <div className='scsc'>
        <br />
        {/* <div className='font'>대댓글</div> */}
        <hr />
        <div className='comment-form'>
          <textarea
            className='comment-title'
            onChange={handleInputChange}
            name='rtitle'
            value={replys.rtitle}
            placeholder='대댓글을 작성해 주세요'
          />
          <textarea
            className='comment-username'
            onChange={handleInputChange}
            name='rusername'
            value={replys.rusername}
            placeholder='작성자'
          />
          <button
            className='comment-button'
            type='submit'
            onClick={() => addReply()}
          >
            게시
          </button>
        </div>
        <div className='renderComment'>
          {console.log(real)}
          {console.log(rdata)}
          {/* {console.log(rdata.filter((el) => el.comments_id === comment.id))} */}
          {real.map((el, id) => {
            return (
              <div key={id} className='singleComment'>
                <div className='singleComment-1'>⤷</div>
                <div className='singleComment-title'>{el.rtitle}</div>
                <div className='singleComment-username'>{el.rusername}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
