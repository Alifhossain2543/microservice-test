const express = require("express")
const app = express()
const { randomBytes } = require("crypto")
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require("axios")

app.use(cors())
app.use(bodyParser.json())

const comments = {}

app.get("/posts/:id/comments", (req, res) => {
    const userComments = comments[req.params.id] || []
    
  res.json(userComments)
})

app.post("/posts/:id/comments", async (req, res) => {
  const { title } = req.body
  const id = randomBytes(4).toString("hex")
  const allComment = comments[req.params.id] || []

  allComment.push({
    id: id,
    title,
    status: "pending"
  })

   comments[req.params.id] = allComment

   try {

    await axios.post("http://localhost:4005/event", {
      type: "commentCreated",
      data: {
        id,
        title,
        postId: req.params.id,
        status: "pending",
      },
    })
   }catch(err) {
       console.log("something went wrong")
   }
    

  res.json(allComment)
})

app.post("/event", async (req, res) => {
    const event = req.body
  const { type, data } = event

//   console.log(event)

  if (type == "commentModerated") {
      const { id, title, postId, status} = data


      const allComments = comments[postId]

      const thisComment = allComments.find((comment) => comment.id == id)
      thisComment.status = status

        await axios.post("http://localhost:4005/event", {
          type: "commentUpdated",
          data: {
            id,
            title,
            postId,
            status
          },
        })

  }


  res.send({})
})

app.listen(4001, () => {
  console.log("listening on port 4001")
})
