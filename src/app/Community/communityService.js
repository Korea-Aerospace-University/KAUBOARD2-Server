const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const communityDao = require("./communityDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

exports.addBoardPost = async function (body) {
    const insertPostParams = [body.title, body.contents, body.stcode, body.stcode.substr(2, 2) + '학번']
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardCommunityPostList = await communityDao.addBoardPost(connection, insertPostParams);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardCommunityPostList);
}

exports.deleteArticle = async function (body) {
    const deleteArticleParams = [body.articleIdx]
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardCommunityArticleDelete = await communityDao.deleteArticle(connection, deleteArticleParams);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardCommunityArticleDelete);
}

exports.addPostComments = async function (body) {
    const insertPostCommentParams = [body.articleIdx, body.stcode, body.stcode.substr(2, 2) + '학번', body.commentText]
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardCommunityPostCommentList = await communityDao.addPostComments(connection, insertPostCommentParams);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardCommunityPostCommentList);
}

exports.deleteArticleComment = async function (body) {
    const deleteCommentParams = [body.idx]
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardCommunityArticleDelete = await communityDao.deleteArticleComment(connection, deleteCommentParams);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardCommunityArticleDelete);
}

exports.updatePostVotes = async function (body) {
    const updateVotesQeury = [body.articleIdx]
    const connection = await pool.getConnection(async (conn) => conn);
    const kauboardCommunityPostVotes = await communityDao.updatePostVotes(connection, updateVotesQeury);
    connection.release();
    return response(baseResponse.SUCCESS, kauboardCommunityPostVotes);
}