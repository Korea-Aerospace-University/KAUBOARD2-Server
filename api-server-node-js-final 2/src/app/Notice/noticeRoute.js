module.exports = function (app) {
  const notice = require("./noticeController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 공지 등록 API
  app.post("/notices", notice.postNotice);
};
