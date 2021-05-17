module.exports = function (app) {
  const notice = require("./noticeController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  //공지 등록 페이지
  app.get("/notices/main", notice.getSubmitPage);

  // 1. 공지 등록 API
  app.post("/notices", notice.postNotice);

  // 2. 공지 조회 API
  app.get("/notices", notice.getNotices);
};
