const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json())


app.post("/event", async (req, res) => {
  const {type, data} = req.body;

  if(type == "commentCreated"){
      let { id, title, postId, status } = data
      const thisStatus = title.includes("orange") ? "reject" : "approved"


      await axios.post("http://localhost:4005/event", {
        type: "commentModerated",
        data: { id, title, postId, status: thisStatus },
      })
  }

  res.send({})
})

app.listen(4003, () => {
  console.log("listening on port 4003")
})
