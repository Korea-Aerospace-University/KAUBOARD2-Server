// 게시물 조회
async function selectAllBoardPosts(connection) {
    const selectPostsQuery = `
                select *
                from mainBoard
                order by idx desc
                `;
    const [postRows] = await connection.query(selectPostsQuery);

    return postRows;
}

// 게시물 추가
async function addBoardPost(connection, insertPostParams) {
    const selectLastIdxQuery = `
    select idx from mainBoard order by idx desc limit 1
            `;
    const [result] = await connection.query(selectLastIdxQuery);
    const insertPostsQuery = `
                insert into mainBoard(idx, title, content, time, stcode, nickname, comment, likes) 
                values(${result[0].idx + 1}, ?, ?, now(), ?, ?, 0, 0);
                `;
    // const insertPostsQuery = `insert into mainBoard(idx, title, content, time, nickname, comment) values(${result[0].idx + 1}, '이순신', 'content', now(), '익명', 0);`;
    const [postRows] = await connection.query(
        insertPostsQuery,
        insertPostParams);

    return postRows;
}

// 게시물 삭제
async function deleteArticle(connection, deleteArticleParams) {
    const deleteArticleQuery = `
                delete from mainBoard where idx=?
                `;
    const [postRows] = await connection.query(
        deleteArticleQuery,
        deleteArticleParams);

    return postRows;
}

// 게시물 댓글 조회
async function selectPostComments(connection, selectPostParams) {
    const selectPostsQuery = `
                select *
                from mainBoardComment
                where articleIdx=?
                `;
    const [commentRows] = await connection.query(selectPostsQuery, selectPostParams);

    return commentRows;
}

// 댓글 추가
async function addPostComments(connection, insertCommentParams) {
    const selectLastIdxQuery = `
    select idx from mainBoardComment order by idx desc limit 1
            `;
    const [result] = await connection.query(selectLastIdxQuery);
    const insertCommentQuery = `
                insert into mainBoardComment(idx, articleIdx, stcode, nickname, commentText,  time, likes) 
                values(${result[0].idx + 1}, ?, ?, ?, ?, now(), 0);
                `;
    const [commentRows] = await connection.query(
        insertCommentQuery,
        insertCommentParams);
    const updateCommentCountQuery = `
                update mainBoard set comment=comment+1 where idx=${insertCommentParams[0]};
                `;

    const [updateResult] = await connection.query(updateCommentCountQuery);
    return commentRows;
}

// 댓글 삭제
async function deleteArticleComment(connection, deleteCommentParams) {
    const deleteCommentQuery = `
                delete from mainBoardComment where idx=?
                `;
    const [deleted] = await connection.query(
        deleteCommentQuery,
        deleteCommentParams);

    return deleted;
}

// 공감 수 업데이트
async function updatePostVotes(connection, updateVoteParams) {
    const updateVotesCountQuery = `
                update mainBoard set likes=likes+1 where idx=?;
                `;

    const [updateResult] = await connection.query(updateVotesCountQuery, updateVoteParams);
    return updateResult;
}
module.exports = {
    selectAllBoardPosts,
    addBoardPost,
    deleteArticle,
    selectPostComments,
    addPostComments,
    deleteArticleComment,
    updatePostVotes
};