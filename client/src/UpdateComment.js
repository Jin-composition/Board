import React, { useState } from 'react';
import AddBoard from './AddBoard';
import UpdateTitle from './UpdateTitle';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import CommentInput from './CommentInput';

const UpdateComment = ({info, selected, handleEdit, handleEditSubmit}) => {
  const { id } = useParams();
  const [dummyData] = info.filter((el) => el.id == id)
  const navigate = useNavigate();
  //console.log(dummyData) 
  const [edited, setEdited] = useState(selected);
  
  const [inputs, setInputs] = useState({
    id: dummyData.id,
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
      id: dummyData.id,
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
      id: 0,
      title: '',
      username: '',
      content: '',
    })
 }

  return (
    <>
    <UpdateTitle />
    <CommentInput />
    </>
  )

}

export default UpdateComment;

