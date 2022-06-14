import React, { useRef, useState } from 'react';
import './css/AddBoard.css';
import FileInput from './FileInput';


const AddBoard = ({inputs,handleInputChange, handleSubmit}) => {


  return (
    <>
      <div className='form_box'>
        <form onSubmit={handleSubmit}>
          {/* <FileInput  name="imgFile" value={inputs.imgFile} /> */}
          <label>
            <input type="text" className="title_input" placeholder='제목을 입력해주세요' onChange={handleInputChange} name='title' defaultValue={inputs.title} ></input>
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
    </>
  )
}

export default AddBoard;