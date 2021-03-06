const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const noticeProvider = require("./noticeProvider");
const noticeDao = require("./noticeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connect } = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createNotice = async function (adminIdx, title, contents) {
  try {
    const insertNoticeParams = [adminIdx, title, contents];

    const connection = await pool.getConnection(async (conn) => conn);
    const noticeIdResult = await noticeDao.insertNotice(
      connection,
      insertNoticeParams
    );
    console.log(`추가된 공지 : ${noticeIdResult.insertId}`);
    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - createNotice Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};


exports.updateNotice = async function (noticeIdx, title, contents) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const updateNoticeParams = [title, contents, parseInt(noticeIdx)];

    const noticeIdResult = await noticeDao.updateNotice(
      connection,
      updateNoticeParams
    );
    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - updateNotice Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
//공지 삭제
exports.deleteNotice = async function (noticeIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const noticeIdResult = await noticeDao.deleteNotice(
      connection,
      noticeIdx
    );
    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - deleteNotice Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};