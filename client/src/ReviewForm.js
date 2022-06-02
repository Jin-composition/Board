import { useState } from 'react';
import FileInput from './FileInput';
import './ReviewForm.css';



const ReviewForm = ({initialPreview}) => {
  const [inputs, setInputs] = useState({
    board_idx: 0,
    title:'',
    username: '',
    content:'',
    views: 0
  });


  const handleChange = (name, value) => {
    setInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('board_idx', inputs.board_idx);
    formData.append('title', inputs.title);
    formData.append('username', inputs.username);
    formData.append('content', inputs.content);
    formData.append('imgFile', inputs.imgFile);
    setInputs(inputs);
  };

  return (
    <>
      <form className='ReviewForm' onSubmit={handleSubmit}>
        <FileInput
          className="ReviewForm-preview"
          name="imgFile"
          value={inputs.imgFile}
          initialPreview={initialPreview}
          onChange={handleChange}
        />
        <div className="ReviewForm-rows">
          <div className="ReviewForm-title-rating">
            <input
              className="ReviewForm-title"
              name="title"
              value={inputs.title}
              placeholder= '제목을 입력해주세요'
              onChange={handleInputChange}
            />
          </div>
          <textarea
            className="ReviewForm-content"
            name="content"
            value={inputs.content}
            placeholder='내용을 입력해주세요'
            onChange={handleInputChange}
          />
          <div className="ReviewForm-error-buttons">
            
          
              <button className="ReviewForm-submit-button" type="submit">게시</button>    
          </div>
        </div>
      </form>
    </>

  );
}

export default ReviewForm;
