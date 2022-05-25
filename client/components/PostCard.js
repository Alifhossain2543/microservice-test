import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import CommentList from './CommentList'

const PostCard = ({key, post}) => {
  const [title, setTitle] = useState("")
  const [allComment, setAllComment] = useState([])
  const [loadData, setLoadData] = useState(false)

  const commentHandler = async () => {
       try {
         const { data } = await axios.post(`http://localhost:4001/posts/${post.id}/comments`, {
           title
         })
         setTitle("")
         console.log(data)
       } catch (e) {
         console.log(e)
       }
  }

  useEffect(() => {
    setLoadData(true)
  }, [])


    useEffect(() => {
      if (loadData == true) {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(
              `http://localhost:4001/posts/${post.id}/comments`
            )
            setAllComment(Object.values(data))
          } catch (e) {
            console.log(e)
          }
        }

        fetchData()
      }
    }, [loadData == true])

    
  return (
    <div style={{ border: "1px solid #33333333", padding: "5px" }}>
      <h5>{post?.title}</h5>

      <ul>
        {allComment?.map((item, inx) => {
          return <li key={inx} style={{fontSize : 12}} >{item.title}</li>
        })}
      </ul>

  
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={commentHandler}>Comment</button>
    </div>
  )
}

export default PostCard