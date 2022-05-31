import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import CommentList from './CommentList'

const PostCard = ({ key, post, allComment }) => {
  const [title, setTitle] = useState("")
  const [loadData, setLoadData] = useState(false)

  const commentHandler = async () => {
    try {
      const { data } = await axios.post(
        `http://posts.com/posts/${post.id}/comments`,
        {
          title,
        }
      )
      setTitle("")
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div style={{ border: "1px solid #33333333", padding: "5px" }}>
      <h5>{post?.title}</h5>

      <ul>
        {allComment?.map((item, inx) => {
          return (
            <li key={inx} style={{ fontSize: 12 }}>
              {item.title}
            </li>
          )
        })}
      </ul>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={commentHandler}>Comment</button>
    </div>
  )
}

export default PostCard