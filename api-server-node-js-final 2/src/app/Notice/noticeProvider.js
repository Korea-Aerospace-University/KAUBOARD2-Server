const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const noticeDao = require("./noticeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.getNotices = async function() {
    const connection = await pool.getConnection(async (conn) => conn);
    const noticeList = await noticeDao.selectNotices(connection);
    connection.release();

    return response(baseResponse.SUCCESS, noticeList);
}