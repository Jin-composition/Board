import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './Detail.css';
import moment from 'moment';
import Comment from './Comment';
import axios from 'axios';
import LoadingIndicator from './LoadingIndicator';
import SingleComment from './SingleComment';

function Detail({info, handleSave}) {
  const [data, setData] = useState([]);
  // const [cdata, setCdata] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [dummyData] = info.filter((el) => el.id == id)
  const [isLoading, setIsLoading] = useState(false)
  // console.log(id)

  const apiDetail = async() => {
    await axios.get('/api/detail/:id', {params:id})
      .then((res) => {
        //console.log(res.data)
        setData(res.data[0]);
      })
      .catch((err) => {
        console.log('comment-err ' + err)
      })
  }

  // const getComment = async() => {
  //    await axios.get('/api/getcomment', {params: id})
  //   .then((res) => {
  //     //console.log(res.data)
  //     setCdata(res.data)
  //   })
  //   .catch((err) => {
  //     console.log('comment-err ' + err)
  //   })
  // }

  useEffect(() => {
    apiDetail();
    // getComment()
  }, [])
 

  return (<>
   <h2 align="center">게시글 상세정보</h2>
  
  <div className="post-view-wrapper">
      {
        data ? (
          <>
            {/* <div className="post-view-row">
              <label>게시글 번호</label>
              <label>{ data['@ROWNUM:=@ROWNUM+1'] }</label>
            </div> */}
            <div className="post-view-row">
              <label>제목</label>
              <label>{ data.title }</label>
            </div>
            <div className="post-view-row">
              <label>작성자</label>
              <label>{ data.username }</label>
            </div>
            <div className="post-view-row">
              <label>작성일</label>
              <label>{ moment(data.reg_date).format('YYYY.MM.DD HH:mm:ss') }</label>
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
    </div>
    
    <Comment id={id}/>
    {/* {isLoading ? <LoadingIndicator /> : <Comment id={id} cdata={cdata}/>} */}
    {/* {console.log(cdata)} */}
    {/* {cdata.length > 0 ? cdata.map((el, id) => 
          <SingleComment comment={el} />
        ) : '해당 게시물엔 댓글이 없습니다.' } */}

    <br />
    <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
  </>);
}


export default Detail;