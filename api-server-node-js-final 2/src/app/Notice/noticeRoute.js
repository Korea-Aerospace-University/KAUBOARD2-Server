module.exports = function (app) {
  const notice = require("./noticeController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 카우보드 전체공지 조회 페이지
  app.get("/view/notices", notice.getNotices);

  // 카우보드 공지 등록 페이지
  app.get("/view/notices/register", notice.getSubmitPage);

  // 카우보드 공지 수정 페이지
  app.get("/view/notices/:noticeIdx/update", notice.getNoticeById);

  // 카우보드 공지 등록 API
  app.post("/notices", notice.postNotice);

  // 카우보드 공지 조회 API 
  app.get("/notices", notice.getNotices);

  // 카우보드 공지 수정 API 
  app.post("/notices/:noticeIdx/update", notice.patchNotice);

  // 카우보드 공지 삭제 API 
  app.get("/notices/:noticeIdx/delete", notice.deleteNotice);

  // 학교 공지 조회 API
  app.post("/kaunotices", notice.getKauNotices);
};
