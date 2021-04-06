const express = require('express');
const PORT = process.env.PORT ? process.env.PORT : 3000
const app = express()

app.get("/", (req, res, next) => {
    res.send("Hello World")
})

app.listen(PORT)