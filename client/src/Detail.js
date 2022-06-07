import { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './Detail.css';
import moment from 'moment';
import CommentInput from './CommentInput';
import Comment from './Comment';

function Detail({info}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [comments, setComments] = useState([
    { id: 1, name: 'Minjoo Park', content: 'I like it!', }
  ]);
  
  const nextId = useRef(1);

  const onInsert = useCallback(
    (name, content) => {
      const comment = {
        id: nextId.current,
        name,
        content
      };
      console.log(name);
      console.log(content);
      setComments(comments => comments.concat(comment));
      nextId.current += 1; //nextId 1씩 더하기
    },
    [comments],
  );


  const [dummyData] = info.filter((el) => el.board_idx == id)
  //console.log(dummyData) 

  return (<>
   <h2 align="center">게시글 상세정보</h2>
  
  <div className="post-view-wrapper">
      {
        info ? (
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
    <CommentInput onInsert={onInsert} />
    <div style={{ marginBottom: "4rem" }}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              name={comment.name}
              content={comment.content}
            />
          )
        })}
      </div>
      {/* <Comment /> */}
      <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
  </>);
}


export default Detail;