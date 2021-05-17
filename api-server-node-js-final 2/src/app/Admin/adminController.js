const jwtMiddleware = require("../../../config/jwtMiddleware");
// const adminProvider = require("./adminProvider");
const adminService = require("./adminService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/*
    API Name: 관리자 로그인 API
    [POST] /admin/login
    body: adminEmail, password
*/
exports.adminLogin = async function(req, res) {
    const {adminEmail, password} = req.body;

    // TODO: 형식적 validation 추가하기

    const siginInResponse = await adminService.adminSignIn(adminEmail, password);

    return res.send(siginInResponse);
}