const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const adminDao = require("./adminDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// admin 이메일 확인
exports.emailCheck = async function(adminEmail) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await adminDao.selectAdminEmail(connection, adminEmail);
    connection.release();

    return emailCheckResult;
};

// admin 비밀번호 확인
exports.passwordCheck = async function(checkPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await adminDao.selectAdminPassword(connection, checkPasswordParams);
    connection.release();

    return passwordCheckResult;
};

// admin status 확인
exports.accountCheck = async function(adminEmail) {
    const connection = await pool.getConnection(async (conn) => conn);
    const adminAccountResult = await adminDao.selectAdminAccount(connection, adminEmail);
    connection.release();

    return adminAccountResult;
};