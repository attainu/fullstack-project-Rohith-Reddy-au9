const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const {readdirSync} = require('fs')
require('dotenv').config()



const app = express()

app.use(cors())
app.use(express.json({limit: "5mb"}))
app.use(morgan('dev'))

// data base connection 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err, res)=>{
    if (err) throw err
    console.log("DATABAE CONNECTED")
})

app.get('/', ( err, res) => {
    res.send("api hitting")
})


readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));


const port = process.env.PORT || 9000

app.listen(port, (err, res) => {
    if (err) throw err
    console.log(`app is running on port ${port}`)
})

