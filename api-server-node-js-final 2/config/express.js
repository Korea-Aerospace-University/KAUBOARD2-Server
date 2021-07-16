const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
var cors = require("cors");
var cookieParser = require('cookie-parser');
const formatMessage = require("../utils/messages");
const http = require('http');
module.exports = function () {

    const app = express();
  

    //var server = app.listen(3000)
    const httpServer = http.createServer(app)


    app.use(cors());
    app.use(compression());

    app.use(express.json());
    app.use(cookieParser());

    //ejs
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.use(express.urlencoded({ extended: true }));

    app.use(methodOverride());

  
    app.use(express.static("statics"));

    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require("../src/app/User/userRoute")(app);
    require("../src/app/Notice/noticeRoute")(app);
    require("../src/app/Admin/adminRoute")(app);
    require("../src/app/Virus/virusRoute")(app);

        /* 채팅 */
        const io = require("socket.io")(httpServer, {
          cors: {
              origin: "*",
              methods: ["GET", "POST"],
          },
        })
      const botName = "카우랜드 봇";
    
      //////////////////
      io.on("connection", (socket) => {
        const { id } = socket.client;
        socket.emit(
          "message",
          formatMessage(botName, "카우랜드에 오신 것을 환영합니다!")
        );
      
        socket.on("sendMessage", (data) => {
          io.emit("message", formatMessage(data.name, data.msg));
        });
      });

    httpServer.listen(3000)
    return app;
};
