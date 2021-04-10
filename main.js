const express = require('express');
const PORT = process.env.PORT ? process.env.PORT : 4000
const app = express()
const fs = require('fs')

app.use(express.static('statics'))
app.use(express.urlencoded({extended: false}))

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
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    res.send(data)
})


app.listen(PORT)