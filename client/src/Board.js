import { useState } from 'react';
import './Board.css';
import AddBoard from './AddBoard';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import CreateTitle from './CreateTitle';
import Pagination from './Pagination';



const Board = ({info, inputs, handleDelete, handleInputChange, handleSubmit}) => {
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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
        <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select type="number" value={limit} onChange={({ target: { value } }) => setLimit(Number(value))}>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
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
            {info.slice(offset, offset+limit).map((el, id) => {
              //console.log(el)
              return (
                <tr key={id} className='tdTr'>
                  <td className='tdTitle'>{el['@ROWNUM:=@ROWNUM+1']}</td>
                  <Link to={`/detail/${el.id}`}>{el.title}</Link>
                  <td>{el.username}</td>
                  <td>{moment(el.reg_date).format('YYYY.MM.DD HH:mm:ss')}</td>
                  <Link to={`/update/${el.id}`}><button>수정</button></Link>
                  <td><input type='button' value='삭제' id={el.id} onClick={onDelete} /></td>  
                </tr>  
              )
            })}
          </tbody>    
        </table>
        
      </div>
      <Pagination total={info.length} limit={limit} page={page} setPage={setPage}/>
      <CreateTitle />
      <AddBoard inputs={inputs} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
    </>
  );

};

export default Board;