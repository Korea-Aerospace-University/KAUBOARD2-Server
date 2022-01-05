const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const noticeDao = require("./noticeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const axios = require('axios');

exports.getNotices = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardNoticeList = await noticeDao.selectNotices(connection);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardNoticeList);
}

//관리자용 전체공지 조회
exports.getAllNotices = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardNoticeList = await noticeDao.selectAllNotices(connection);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardNoticeList);
}

//공지 1개 조회
exports.getNoticeById = async function (noticeIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardNoticeList = await noticeDao.selectNoticeById(connection, noticeIdx);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardNoticeList[0]);
}