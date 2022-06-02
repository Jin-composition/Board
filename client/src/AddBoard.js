import React, { useRef, useState } from 'react';
import axios from 'axios';
import './AddBoard.css';

const AddBoard = ({info, handleSave}) => {

  const [inputs, setInputs] = useState({
    board_idx: 0,
    title:'',
    username: '',
    content:'',
    views: 0
  });

 
  const handleChange = (e) => {
    const {name, value} = e.target;

    setInputs({
      ...inputs,
      [name]: value,
      views: 0
    })
    //console.log(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    handleSave(inputs);

    
    await axios.post('/api/post', inputs)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log("client-err"+err)   
    })
    setInputs({
      board_idx: 0,
      title: '',
      username: '',
      content: '',
    })
    
    e.target.reset();
  }


  return (
    <>
      <div className='form_box'>
        <h3>게시글 작성하기</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" className="title_input" placeholder='제목을 입력해주세요' onChange={handleChange} name='title' defaultValue={inputs.title} ></input>
          </label>
          <br />
          <label>
            <input type="text" className="name_input" placeholder='이름을 입력해주세요' onChange={handleChange} name='username' defaultValue={inputs.username} ></input>
          </label>
          <label>
            <textarea className='content_input' placeholder='내용을 입력해주세요' onChange={handleChange} name='content' defaultValue={inputs.content} ></textarea>
          </label>
          <br />
          <button className="write_button">게시</button>
        </form>
      </div>
    </>
  )
}

export default AddBoard;