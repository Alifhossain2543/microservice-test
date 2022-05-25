const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require("axios")

app.use(cors())
app.use(bodyParser.json())


app.post("/event", async (req, res) => {
    const event = req.body

    await axios.post("http://localhost:4000/event", event)
    await axios.post("http://localhost:4001/event", event)
    await axios.post("http://localhost:4002/event", event)

  res.json("OK")
})


app.listen(4005, () => {
  console.log("listening on port 4005")
})
