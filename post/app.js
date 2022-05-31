const express = require("express")
const app = express()
const {randomBytes} = require("crypto")
const bodyParser = require("body-parser")
const cors = require('cors')
const axios = require("axios")

app.use(cors())
app.use(bodyParser.json())


const posts = {}

app.get("/posts", (req, res) => {
    res.json(posts)
})


app.post('/posts/create', async (req, res) => {
    const {title} = req.body
    const id = randomBytes(4).toString("hex")
    posts[id] = {
        id : id, title
    }

    try {
         await axios.post("http://event-bus-srv:4005/event", {
           type: "postCreated",
           data: {
             id,
             title,
           },
         })

    }catch(e) {
        console.log("something went wrong!")
    }
   
    res.json(posts[id])

})

app.post('/event', (req, res) => {
    console.log("event recieved: " + req.body.type )

    res.send({})
})


app.listen(4000, (() => {
    console.log("v100")
    console.log("listening on port 4000")
}))