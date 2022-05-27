import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './Detail.css';
import moment from 'moment';

function PostView({info}) {
   const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  console.log(info)

  // async function getPostView() {
  //   await axios.get(`/api/postView/${id}`)
  //     .then((res)=> {
  //       //console.log(res.data)
  //       setData(res.data);
  //   })
  // }

  // useEffect(() => {
  //   //console.log(data)
  //   getPostView();
  // }, []);

 

  const [dummyData] = info.filter((el) => el.board_idx == id)
  console.log(dummyData) 

  return (<>
   <h2 align="center">게시글 상세정보</h2>
  
  <div className="post-view-wrapper">
      {
        data ? (
          <>
            <div className="post-view-row">
              <label>게시글 번호</label>
              <label>{ dummyData.board_idx }</label>
            </div>
            <div className="post-view-row">
              <label>제목</label>
              <label>{ dummyData.title }</label>
            </div>
            <div className="post-view-row">
              <label>작성자</label>
              <label>{ dummyData.username }</label>
            </div>
            <div className="post-view-row">
              <label>작성일</label>
              <label>{ moment(dummyData.reg_date).format('YYYY.MM.DD HH:mm:ss') }</label>
            </div>
            <div className="post-view-row">
              <label>조회수</label>
              <label>{}</label>
            </div>
            <div className="post-view-row">
              <label>내용</label>
              <div>
                {
                  dummyData.content
                }
              </div>
            </div>
          </>
        ) : '해당 게시글을 찾을 수 없습니다.'
      }
    </div>
      <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
  </>);
}


export default PostView;