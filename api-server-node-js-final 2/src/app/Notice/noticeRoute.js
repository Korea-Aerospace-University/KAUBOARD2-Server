module.exports = function (app) {
  const notice = require("./noticeController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 카우보드 공지 등록 페이지
  app.get("/view/notices", notice.getSubmitPage);

  // 카우보드 공지 등록 API
  app.post("/notices", notice.postNotice);

  // 카우보드 공지 조회 API 
  app.get("/notices", notice.getNotices);

  // 학교 공지 조회 API
  app.post("/kaunotices", notice.getKauNotices);
};
