const express = require('express');
const cors = require('cors')
const fs = require('fs')
const PORT = process.env.PORT ? process.env.PORT : 4000
const app = express()

app.use(express.static('statics'))
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.post("/submit", (req, res, next) => {
    let data = JSON.stringify(req.body)
    console.log(data)
    fs.writeFileSync('contents.json', data)
        res.redirect('/')
    })

app.get("/", (req, res, next) => {
    res.sendFile(__dirname + '/statics/html/home_notice_upload.html')
})

app.get("/contents",(req, res, next)=>{
    let rawData = fs.readFileSync('contents.json')
    let data = JSON.parse(rawData)
    res.send(data)
})


app.listen(PORT)