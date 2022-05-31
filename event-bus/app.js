const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require("axios")

app.use(cors())
app.use(bodyParser.json())


app.post("/event", (req, res) => {
    const event = req.body
        console.log("eventt recieved: " + req.body.type)


    axios.post("http://post-srv-cluster:4000/event", event)
    axios.post("http://comment:4001/event", event)
    axios.post("http://query-hub:4002/event", event)
    axios.post("http://moderation:4003/event", event)

  res.json("OK")
})


app.listen(4005, () => {
  console.log("listening on port 4005")
})
