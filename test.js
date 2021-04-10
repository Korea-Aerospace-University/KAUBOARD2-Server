const dbconfig = { 
    host: "localhost",
    user: process.env.USER, 
    password: 'david990601*', 
    database: "kau", 
    port: process.env.PGPORT, 
}

const {Client} = require('pg')
const client = new Client()
  client.connect()
  client.query('SELECT * from test', (err, res) => {
    console.log(err, res)
    client.end()
  })