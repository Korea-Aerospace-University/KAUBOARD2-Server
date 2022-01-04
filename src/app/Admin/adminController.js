const jwtMiddleware = require("../../../config/jwtMiddleware");
// const adminProvider = require("./adminProvider");
const adminService = require("./adminService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const emailCheck = require("../Validation/emailCheck");
const regexEmail = require("regex-email");
const { default: axios } = require("axios");

const regexPwd = /^.*(?=^.{6,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

/**
 * 관리자 페이지 불러오기
 * [GET] view/admin
 */
exports.getAdminPage = (req, res, next) => {
    res.sendFile("/KAUBOARD2-Server/statics/html/admin_home.html", {
        root: "../",
    });
};


/**
 * 관리자 로그인 페이지 불러오기
 * [GET] view/admin/login
 */
exports.getAdminLoginPage = (req, res, next) => {
    res.sendFile("/KAUBOARD2-Server/statics/html/admin_login.html", {
        root: "../",
    });
};

/**
 * 관리자 회원가입 페이지 불러오기
 * [GET] view/admin/register
 */
exports.getAdminRegisterPage = (req, res, next) => {
    res.sendFile("/KAUBOARD2-Server/statics/html/admin_register.html", {
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

    //실패
    if (siginInResponse.code !== 1000) {
        res.write("<script>alert('" + siginInResponse.message.toString() + "')</script>");
        res.write("<script>window.location=\"../../view/notices\"</script>");
    }
    else {
        res.cookie('x-access-token', siginInResponse.result.jwt)

        return res.redirect("../view/admin")
    }
};

/*
    API Name: 관리자 회원가입 API
    [POST] /admin
    body: adminName, adminEmail, password
*/
exports.postAdmin = async function (req, res) {
    /*
        Body: adminName, adminEmail, password
    */
    const { adminName, adminEmail, password } = req.body;

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
exports.authSendEmail = async function (req, res) {
    /*
        Body: sendEmail
    */

    const { sendEmail } = req.body;

    // validation
    const validation = await emailCheck.emailCheck(sendEmail);
    if (validation.isSuccess == false) {
        return res.send(validation);
    }

    const mailOptions = {
        from: "harry7231@naver.com",
        // 조민성님 이메일
        to: "roybatty0601@kau.kr",
        subject: "[KAUBOARD] 관리자 인증 요청 이메일입니다.",
        // 추후에 관리자 페이지 등록
        html: `<a href="http://52.79.130.113/auth/admin?authEmail=${sendEmail}">${sendEmail}</a>`
    }
}

/*
    API Name: 관리자 인증 API
    [GET] /auth/admin
*/
exports.authAdmin = async function (req, res) {
    /*
        Query String: authEmail
    */
    const authEmail = req.query.authEmail;

    const authAdminResponse = await adminService.updateAdminStatus(authEmail);

    return res.send(authAdminResponse);
}


exports.test = async function (req, res) {
    /*
        Body: url
    */
    const { url } = req.body;

    const result = await axios.get(url).then((e) => {
        return response(baseResponse.SUCCESS, e.data);
    }).catch((err) => {
        console.log(`${err.message}`);
        return errResponse(baseResponse.DB_ERROR)
    })

    return res.send(result);
}