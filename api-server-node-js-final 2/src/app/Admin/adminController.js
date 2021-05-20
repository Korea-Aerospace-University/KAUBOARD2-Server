const jwtMiddleware = require("../../../config/jwtMiddleware");
// const adminProvider = require("./adminProvider");
const adminService = require("./adminService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const regexEmail = require("regex-email");
const { emit } = require("nodemon");

const regexPwd = /^.*(?=^.{6,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

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
 * 관리자 회원가입 페이지 불러오기
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

    // validation
    if (!adminEmail) {
        return res.send(response(baseResponse.SIGNIN_EMAIL_EMPTY));
    } else if (!password) {
        return res.send(response(baseResponse.SIGNIN_PASSWORD_EMPTY));
    }

    if (!regexEmail.test(adminEmail)) {
        return res.send(response(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));
    }

    const siginInResponse = await adminService.adminSignIn(adminEmail, password);

    return res.send(siginInResponse);
};

/*
    API Name: 관리자 회원가입 API
    [POST] /admin
    body: adminName, adminEmail, password
*/
exports.postAdmin = async function(req, res) {
    /*
        Body: adminName, adminEmail, password
    */
    const {adminName, adminEmail, password} = req.body;

    // validation
    if (!adminName) {
        return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
    } else if (!adminEmail) {
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    } else if (!password) {
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY))
    }

    if (adminEmail.length > 45) {
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH))
    } else if (password.length < 6 || password.length > 20) {
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    }

    if (!regexEmail.test(adminEmail)) {
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    } else if (!regexPwd.test(password)) {
        return res.send(response(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
    }

    const signUpResponse = await adminService.createAdmin(adminName, adminEmail, password);

    return res.send(signUpResponse);
}
