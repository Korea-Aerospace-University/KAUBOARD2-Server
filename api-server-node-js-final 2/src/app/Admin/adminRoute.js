module.exports = function (app) {
  const admin = require("./adminController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  //관리자 로그인 페이지
  app.get("/view/admin/login", admin.getAdminLoginPage);

  //관리자 로그인 페이지
  app.get("/view/admin/register", admin.getAdminRegisterPage);

  // 관리자 로그인 API
  app.post("/admin/login", admin.adminLogin);
};
