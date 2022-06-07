import { useState } from 'react';

const Comment = () => {
  const [value, setValue] = useState('');
  const [commentList, setCommentList] = useState([]);


  const getValue = (e) => {
    setValue(e.target.value);
  }

  const addComment = () => {
    setCommentList([...commentList, value]);
  }
  return (
    <>
      <form onSubmit={addComment}>
        <input type="text" onChange={getValue}/>
          <button>submit</button>
          <ul>
            <li>hello</li>
            {commentList.map((comment, index) => {
              <li key={index}>{comment}</li>
            })}
          </ul> 
      </form>
    </>
  )
};

export default Comment;