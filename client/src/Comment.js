import React, { useCallback, useState } from 'react';
import axios from 'axios';
import './Comment.css';
// import { useSelector } from 'react-redux';

function Comment(props) {
  // console.log(props)

  const [value, setValue] = useState({
    content: ''
});


const onChangeContent = useCallback(
    (e) => {
        setValue({
            name: value.name,
            content: e.target.value,
        });
    },
    [value]
);

  const onsubmit = (e) => {
    e.preventDefault();
    

  };
  return (
    <div className='comment'>
      <br />
      <p>댓글</p>
      <hr />

      {/* Comment Lists */}

      {/* Root Comment Form */}

      <form className='comment-form' onSubmit={onsubmit}>
        <textarea className='comment-textarea'
          onChange={onChangeContent}
          value={value.content}
          placeholder="댓글을 작성해 주세요"
        />
        <br />
        <button className='comment-button' onClick={onsubmit}>
          댓글입력
        </button>
      </form>
    </div>
  );
}

export default Comment;