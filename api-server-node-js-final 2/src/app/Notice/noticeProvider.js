const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const noticeDao = require("./noticeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const axios = require('axios');

exports.getNotices = async function() {
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardNoticeList = await noticeDao.selectNotices(connection);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardNoticeList);
}