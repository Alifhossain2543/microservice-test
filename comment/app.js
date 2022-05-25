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
  })

   comments[req.params.id] = allComment

   try {

    await axios.post("http://localhost:4005/event", {
      type: "commentCreated",
      data: {
        id,
        title,
        postId: req.params.id,
      },
    })
   }catch(err) {
       console.log("something went wrong")
   }
    

  res.json(allComment)
})

app.post("/event", (req, res) => {
  console.log("event recieved: " + req.body.type)

  res.send({})
})

app.listen(4001, () => {
  console.log("listening on port 4001")
})
