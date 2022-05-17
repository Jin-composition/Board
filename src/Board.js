import React, { useEffect, useState } from 'react';
import './Board.css';
import axios from 'axios';
import Tr from './Tr';

const Board = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => setInfo(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div>
      <h2 align="center">게시판</h2>
        <table className="board">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <Tr info={info} />
        </table>
      </div>


    </>
  );

};

export default Board;