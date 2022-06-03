import { useState } from 'react';
import './Board.css';
import AddBoard from './AddBoard';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import CreateTitle from './CreateTitle';


const Board = ({info, inputs, handleDelete, handleInputChange, handleSubmit}) => {

 
  const onDelete = async (e) => {
    //console.log(e.target.id)
    if(window.confirm('정말 삭제 하시겠습니까?')){
      alert('삭제되었습니다')
      const num = Number(e.target.id)
      await axios.delete('/api/post/:id', {data: {num}})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log("client-err"+err)
        
      })
      handleDelete(num)
    }else{
      alert('취소합니다')
    }
  }

  
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
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {info.map((el, id) => {
              //console.log(el)
              return (
                <tr key={id} className='tdTr'>
                  <td className='tdTitle'>{id+1}</td>
                  <Link to={`/detail/${el.board_idx}`}>{el.title}</Link>
                  <td>{el.username}</td>
                  <td>{moment(el.reg_date).format('YYYY.MM.DD HH:mm:ss')}</td>
                  <Link to={`/update/${el.board_idx}`}><button>수정</button></Link>
                  <td><input type='button' value='삭제' id={el.board_idx} onClick={onDelete} /></td>
                  
                </tr>  
              )
            })}
          </tbody>    
        </table>
      </div>
      <CreateTitle />
      <AddBoard inputs={inputs} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
    </>
  );

};

export default Board;