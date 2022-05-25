import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import PostCard from '../components/PostCard'

const Home: NextPage = () => {
  const [postTitle, setPostTitle] = useState("")
  const [allPost, setAllPost] = useState({})
  const [loadData, setLoadData] = useState(false)

  const postHandler = async () => {
      try {
        const { data } = await axios.post("http://localhost:4000/posts", {title : postTitle})
        setPostTitle("")
        console.log(data)
      }catch(e) {
        console.log(e)
      }
  }

  useEffect(() => {
    setLoadData(true)
  }, [])

  useEffect(() => {
    if (loadData == true) {
      const fetchData = async () => {
        console.log("running")

        try {
          const { data } = await axios.get("http://localhost:4000/posts")
          setAllPost(data)
          console.log(data)
        } catch (e) {
          console.log(e)
        }
      }

      fetchData()
    }
  }, [loadData == true])


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create a post!</h1>
        <input
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <button style={{ marginTop: 5 }} onClick={postHandler}>
          Submit
        </button>
      </main>

      <h4>Posts :</h4>

      <div style={{display : "flex", gap: "5px"}} >
        {Object.keys(allPost).length > 0 &&
          Object.values(allPost).map((post : any) => {
            return <PostCard key={post.id} post={post} />
          })}
      </div>
    </div>
  )
}

export default Home
