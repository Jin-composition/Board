import React, { useState } from 'react';
import AddBoard from './AddBoard';
import UpdateTitle from './UpdateTitle';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import FileInput from './FileInput';

const UpdateBoard = ({info, selected, handleEdit, handleEditSubmit}) => {
  const { id } = useParams();
  const [dummyData] = info.filter((el) => el.board_idx == id)
  const navigate = useNavigate();
  //console.log(dummyData) 
  const [edited, setEdited] = useState(selected);
  
  const [inputs, setInputs] = useState({
    board_idx: dummyData.board_idx,
    title:dummyData.title,
    username: dummyData.username,
    content:dummyData.content,
  });

  //해당 user의 데이터를 가져오기 위한 함수
  const onEdit = () => {
    handleEdit(dummyData)
  }
  
  //게시글이 수정된 값을 가져오기 위한 함수
  const onEditChange = (e) => {

    setEdited({
      ...edited,
      board_idx: dummyData.board_idx,
      // username: dummyData.username,
      [e.target.name]: e.target.value,  
    })
  }

  //수정된 데이터를 handleEditSubmit 함수에 넣어서 실행
 const onSubmitEdit = (e) => {
   e.preventDefault();
   handleEditSubmit(edited);
  //  const params = new URLSearchParams(); 
  //  params.append('data', 'data!!')
   axios.put('/api/update', edited)
    .then((res) => {

      console.log(res)
    })
    .catch((err) => {
      console.log("onSubmitEdit-err "+err)   
    })
    setInputs({
      board_idx: 0,
      title: '',
      username: '',
      content: '',
    })
 }

  return (
    <>
    <UpdateTitle />
    <div className='form_box'>
        <form onSubmit={onSubmitEdit}>
          <FileInput  name="imgFile" value={inputs.imgFile} />
          <label>
            <input type="text" className="title_input" placeholder='제목을 입력해주세요' onChange={onEditChange} name='title' defaultValue={inputs.title} ></input>
          </label>
          <br />
          <label>
            <input type="text" className="name_input" placeholder='이름을 입력해주세요' onChange={onEditChange} name='username' defaultValue={inputs.username} ></input>
          </label>
          <label>
            <textarea className='content_input' placeholder='내용을 입력해주세요' onChange={onEditChange} name='content' defaultValue={inputs.content} ></textarea>
          </label>
          <br />
          <button className="write_button" onClick={onEdit}>수정하기</button>
        </form>
    </div>
    
      <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
    </>
  )

}

export default UpdateBoard;

