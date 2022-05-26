import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './PostView.css';

const GetData = (no) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/api/postView/${no}`)
      .then((res)=> {
        console.log(res.data)
        setData(res.data);
    })
  }, []);

  const item =  (<>
    <h2 align="center">게시글 상세정보</h2>
  
    <div className="post-view-wrapper">
        {
          data ? (
            <>
              <div className="post-view-row">
                <label>게시글 번호</label>
                <label>{ '악' }</label>
              </div>
              <div className="post-view-row">
                <label>제목</label>
                <label>{ data.title }</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{ data.createDate }</label>
              </div>
              <div className="post-view-row">
                <label>조회수</label>
                <label>{ data.readCount }</label>
              </div>
              <div className="post-view-row">
                <label>내용</label>
                <div>
                  {
                    data.content
                  }
                </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
      </div>
      </>
      )

    return item;
}
 
function PostView({info}) {
  const{id} = useParams();
  const item = GetData(id, info);

  return (<>
    <div>
        {item}
    </div>
  </>);
}


export default PostView;