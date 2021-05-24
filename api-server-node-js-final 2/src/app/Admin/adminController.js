const jwtMiddleware = require("../../../config/jwtMiddleware");
// const adminProvider = require("./adminProvider");
const adminService = require("./adminService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const emailCheck = require("../Validation/emailCheck");
const regexEmail = require("regex-email");
const { emit } = require("nodemon");
const { smtpTransport } = require("../../../config/email");

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

/*
    API Name: 이메일 인증 API
    [POST] /auth/email
    body: sendEmail
*/
exports.authSendEmail = async function(req, res) {
    /*
        Body: sendEmail
    */

    // 메일 인증 링크
    // const authUrl = 

    const { sendEmail } = req.body;

    // validation
    const validation = await emailCheck.emailCheck(sendEmail);
    if (validation.isSuccess == "false") {
        return res.send(validation);
    }

    const mailOptions = {
        from: "harry7231@naver.com",
        to: sendEmail,
        subject: "[KAUBOARD] 관리자 인증 관련 이메일입니다.",
        html: `<a href="http://localhost:3000/auth/admin?authEmail=${sendEmail}">여기를 클릭</a>`
    }

    const result = smtpTransport.sendMail(mailOptions, (error, responses) => {
        if (error) {
            console.log(error);
            smtpTransport.close();
            return res.send(response(baseResponse.SERVER_ERROR));
        } else {
            smtpTransport.close();

            return res.send(response(baseResponse.SUCCESS, {"authEmail": sendEmail}))
        }
    })
}

/*
    API Name: 관리자 인증 API
    [GET] /auth/admin
*/
exports.authAdmin = async function(req, res) {
    /*
        Query String: authEmail
    */
    const authEmail = req.query.authEmail;

    const authAdminResponse = await adminService.updateAdminStatus(authEmail);

    return res.send(authAdminResponse);
}

