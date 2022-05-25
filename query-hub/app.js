const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json())

const posts = {}

app.get("/posts", (req, res) => {
    res.json(posts)

})


app.post("/event", async (req, res) => {
  const event = req.body
    const {type, data} = event
  if (type == "postCreated")  {
      const {id, title} = data
    posts[data.id] = { id, title, comments: [] }
  }

    if (type == "commentCreated") {
    const { id, title, postId, status } = data
    const post = posts[postId]

    post?.comments?.push({id, title, status})

    }

    if (type == "commentUpdated") {
      const { id, title, postId, status } = data

      const post = posts[postId]
    
       const thisComment = post.comments.find((comment) => comment.id == id)
       thisComment.status = status
       thisComment.title = title


    }

    // console.log(posts)
  
  
  res.json({})
})

app.listen(4002, () => {
  console.log("listening on port 4005")
})
