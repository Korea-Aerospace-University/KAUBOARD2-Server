const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const adminProvider = require("./adminProvider");
const adminDao = require("./adminDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

exports.adminSignIn = async function (adminEmail, password) {
    try {
        // 이메일 존재 확인
        const emailRows = await adminProvider.emailCheck(adminEmail);

        // 이메일 존재 x
        if (emailRows.length < 1) {
            return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
        }

        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const checkPasswordParams = [adminEmail, hashedPassword];
        // 비밀번호 존재 확인
        const passwordRows = await adminProvider.passwordCheck(checkPasswordParams);

        // 비밀번호 존재 x
        if (passwordRows[0].length < 1) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 관리자 승인 상태 확인
        const adminInfoRows = await adminProvider.accountCheck(adminEmail);

        // 승인 대기중인 계정
        if (adminInfoRows[0].status == 0) {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ADMIN);
        }

        // 토큰 생성
        let token = await jwt.sign(
            {
                adminIdx: adminInfoRows[0].idx, 
            },
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "adminInfo",
            } // 유효기간: 365일
        );
        return response(baseResponse.SUCCESS, {'adminIdx': adminInfoRows[0].idx, 'jwt': token});
    } catch(err) {
        logger.error(`APP - adminSignIn Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.createAdmin = async function(adminName, adminEmail, password) {
    try {
        // 이메일 중복 확인
        const emailRows = await adminProvider.emailCheck(adminEmail);
        
        // 이메일 중복
        if (emailRows.length > 0) {
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
        }

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");
        
        const insertAdminParams = [adminName, adminEmail, hashedPassword];

        const connection = await pool.getConnection(async (conn) => conn);

        const result = await adminDao.insertAdmin(connection, insertAdminParams);
        connection.release();

        return response(baseResponse.SUCCESS, {insertedAdmin: result[0].insertId});
    } catch (err) {
        logger.error(`App - createAdmin Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.updateAdminStatus = async function(authEmail) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        // 관리자 인증 상태 변경
        const updateResult = await adminDao.updateAdminStatus(connection, authEmail);
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch(err) {
        logger.error(`APP - updateAdminStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}