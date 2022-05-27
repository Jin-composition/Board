import React, { useEffect, useState } from 'react';
import './Board.css';
import AddBoard from './AddBoard';
import { Link } from 'react-router-dom';
import moment from 'moment';


const Board = ({info, handleSave}) => {
 


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
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {info.map((el, id) => {
              return (
                <tr key={id} className='tdTr'>
                  <td className='tdTitle'>{el.board_idx}</td>
                  <Link to={`/postView/${el.board_idx}`}>{el.title}</Link>
                  <td>{el.username}</td>
                  <td>{moment(el.reg_date).format('YYYY.MM.DD HH:mm:ss')}</td>
                  <td>{el.views}</td>
                  <td>수정</td>
                  <td>삭제</td>
                  {/* <td>{item.update_date}</td> */}
                </tr>  
              )
            })}
          </tbody>    
        </table>
      </div>
      <AddBoard info={info} handleSave={handleSave} />
    </>
  );

};

export default Board;