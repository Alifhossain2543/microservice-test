import React from 'react'

const CommentList = ({key, comment}) => {
  return <li key={key}> {comment} </li>
}

export default CommentList