import React, { useState } from 'react';
import AddBoard from './AddBoard';
import UpdateTitle from './UpdateTitle';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import FileInput from './FileInput';

const UpdateBoard = ({info, onUpdate, handleInputChange}) => {
  const { id } = useParams();
  const [dummyData] = info.filter((el) => el.board_idx == id)
  const navigate = useNavigate();
  console.log(dummyData) 
  
  const [inputs, setInputs] = useState({
    board_idx: dummyData.board_idx,
    title:dummyData.title,
    username: dummyData.username,
    content:dummyData.content,
  });

  
 
  return (
    <>
    <UpdateTitle />
    <div className='form_box'>
        <form onSubmit={(e) => {
          const title = e.target.title.value;
          const content = e.target.content.value;
          onUpdate(title, content);
        }}>
          <FileInput  name="imgFile" value={inputs.imgFile} />
          <label>
            <input type="text" className="title_input" placeholder='제목을 입력해주세요' onChange={handleInputChange} name='title' defaultValue={dummyData.title} ></input>
          </label>
          <br />
          <label>
            <input type="text" className="name_input" placeholder='이름을 입력해주세요' onChange={handleInputChange} name='username' defaultValue={inputs.username} ></input>
          </label>
          <label>
            <textarea className='content_input' placeholder='내용을 입력해주세요' onChange={handleInputChange} name='content' defaultValue={inputs.content} ></textarea>
          </label>
          <br />
          <button className="write_button">게시</button>
        </form>
      </div>
    
      <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
    </>
  )

}

export default UpdateBoard;

