import React, { useEffect, useState } from 'react';
import './Board.css';
import AddBoard from './AddBoard';
import Tr from './Tr';


const Board = ({info, onSaveData}) => {
 

  

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
          <Tr info={info}/>        
        </table>
      </div>
      <AddBoard info={info} onSaveData={onSaveData} />

    </>
  );

};

export default Board;