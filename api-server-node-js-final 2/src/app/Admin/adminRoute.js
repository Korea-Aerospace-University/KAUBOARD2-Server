module.exports = function (app) {
    const admin = require("./adminController");
    const jwtMiddleware = require("../../../config/jwtMiddleware");

    // 관리자 메인 페이지 불러오기
    app.get("/view/admin", jwtMiddleware, admin.getAdminPage);

    // 관리자 로그인 페이지 불러오기
    app.get("/view/admin/login", admin.getAdminLoginPage);

    // 관리자 회원가입 페이지 불러오기
    app.get("/view/admin/register", admin.getAdminRegisterPage);

    // 관리자 로그인 API
    app.post("/admin/login", admin.adminLogin);

    // 관리자 회원가입 API
    app.post("/admin", admin.postAdmin);

    // 이메일 인증 API
    app.post("/auth/email", admin.authSendEmail);

    // 관리자 인증 API
    app.get("/auth/admin", admin.authAdmin);

    app.post("/test", admin.test);
};
