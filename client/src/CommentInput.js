import React, { useCallback, useState } from 'react';
import axios from 'axios';


const CommentInput = ({ handleSave, inputs }) => {
    const [value, setValue] = useState({
        name: '',
        content: ''
    });

    const onChangeName = useCallback(
        (e) => {
            setValue({
                name: e.target.value,
                content: value.content,
            });
        },
        [value]
    );

    const onChangeContent = useCallback(
        (e) => {
            setValue({
                name: value.name,
                content: e.target.value,
            });
        },
        [value]
    );


    const onSubmit = (e) => {
      e.preventDefault();
      
      handleSave(inputs);
    
      // axios.post('/api/comment', inputs)
      // .then((res) => {
      //   //console.log(res)
      // })
      // .catch((err) => {
      //   console.log("client-err"+err)   
      // })
    
      
      e.target.reset();
    }

    return (
        <form className="CommentInsert" onSubmit={onSubmit}>
            <input className="inputNames"
                placeholder="이름"
                value={value.name}
                onChange={onChangeName}
            />
            <input placeholder="댓글"
                value={value.content}
                onChange={onChangeContent}
            />
            <button type="submit">게시</button>
        </form>
        
    )
}

export default CommentInput;