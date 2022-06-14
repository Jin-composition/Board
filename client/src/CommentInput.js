const CommentInput = ({handleInputChange, comment, addComment}) => {

  return (
    <div className='comment-form' >
      <textarea className='comment-title'
        onChange={handleInputChange}
        // name='ctitle'
        value={comment.ctitle}
        placeholder="댓글을 작성해 주세요"
      />
        <input className='comment-username'
        onChange={handleInputChange}
        // name='cusername'
        value={comment.cusername}
        placeholder="작성자"
      />
      <button className='comment-button' type='submit' onClick={() => addComment()}>
        게시
      </button>
  </div>
  )
}


export default CommentInput;