import React, { useRef, useState } from 'react';
import './AddBoard.css';

const AddBoard = ({info, onSaveData}) => {

  const num = info
  console.log(info.length)
  const [inputs, setInputs] = useState({
    board_idx: 3,
    title:'',
    username: '',
    content:'',
  });

  const inputReset = useRef(null);

  const displayText = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
    console.log(name, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveData(inputs);
    console.log(inputs);
    setInputs({
      board_idx: inputs.board_idx+1,
      title: '',
      username: '',
      content: '',
    })
    e.target.reset();
  }

  const handleReset = () => {
    setInputs({
      title: '',
      username: '',
      content: '',
    })
  }
  
  // const handleChange = (e) => {
  //   const {username, title} = e.target;
  //   setForm({
  //     ...form,
  //     [username]: title
  //   })
  // }

  //  defaultValue={form.title}
 
  return (
    <>
      <div className='form_box'>
        <h3>게시글 작성하기</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" className="title_input" placeholder='제목을 입력해주세요' onChange={displayText} name='title' defaultValue={inputs.title} ref={inputReset}></input>
          </label>
          <br />
          <label>
            <input type="text" className="name_input" placeholder='이름을 입력해주세요' onChange={displayText} name='username' defaultValue={inputs.username} ref={inputReset}></input>
          </label>
          <label>
            <textarea className='content_input' placeholder='내용을 입력해주세요' onChange={displayText} name='content' defaultValue={inputs.content} ref={inputReset}></textarea>
          </label>
          <br />
          <button className="write_button">게시</button>
        </form>
      </div>
    </>
  )
}

export default AddBoard;