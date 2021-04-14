const express = require('express');
const cors = require('cors')

const herokuAwake = require('./heroku-awake')
const placeRoutes = require('./routes/places-routes')
const formatMessage = require("./utils/messages");

const PORT = process.env.PORT ? process.env.PORT : 5000
const app = express()
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const botName = "카우랜드 봇";

app.use(express.static('statics'))
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.get('/', (req, res, next) => res.redirect('/api'))
app.use('/api', placeRoutes)

//////////////////////////


io.on("connection", (socket) => {
  const { id } = socket.client;
  socket.emit(
    "message",
    formatMessage(botName, "카우랜드에 오신 것을 환영합니다!")
  );

  console.log(`User connected: ${id}`);
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "새로운 참여자가 나타났습니다.")
  );

  socket.on("sendMessage", (msg) => {
    io.emit("message", formatMessage("user", msg));
    console.log(msg);
  });

  socket.on("disconnect", () => {
    io.emit("message", "참여자가 대화방에서 나갔습니다.");
  });
});
///////////////////



server.listen(PORT)

setInterval(herokuAwake, 600000)