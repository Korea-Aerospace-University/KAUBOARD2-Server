const jwtMiddleware = require("../../../config/jwtMiddleware");
// const adminProvider = require("./adminProvider");
const adminService = require("./adminService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const regexEmail = require("regex-email");
const { emit } = require("nodemon");

/**
 * 관리자 로그인 페이지 불러오기
 * [GET] /admin/main
 */
exports.getAdminLoginPage = (req, res, next) => {
  res.sendFile("api-server-node-js-final 2/statics/html/admin_login.html", {
    root: "../",
  });
};

/**
 * 관리자 로그인 페이지 불러오기
 * [GET] /admin/main
 */
exports.getAdminRegisterPage = (req, res, next) => {
  res.sendFile("api-server-node-js-final 2/statics/html/admin_register.html", {
    root: "../",
  });
};

/*
    API Name: 관리자 로그인 API
    [POST] /admin/login
    body: adminEmail, password
*/
exports.adminLogin = async function (req, res) {
  const { adminEmail, password } = req.body;

  // TODO: 형식적 validation 추가하기

  const siginInResponse = await adminService.adminSignIn(adminEmail, password);

  return res.send(siginInResponse);
};
