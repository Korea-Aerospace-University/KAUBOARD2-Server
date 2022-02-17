const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const communityDao = require("./communityDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

//게시판 글 전체 조회
exports.getAllBoardPosts = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardCommunityPostList = await communityDao.selectAllBoardPosts(connection);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardCommunityPostList);
}

//게시글 댓글 전체 조회
exports.getAllPostComments = async function (body) {
    const selectPostCommentParams = [body.articleIdx]
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardCommunityPostCommentList = await communityDao.selectPostComments(connection, selectPostCommentParams);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardCommunityPostCommentList);
}
