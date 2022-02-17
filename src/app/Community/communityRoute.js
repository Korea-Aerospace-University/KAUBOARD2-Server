module.exports = function (app) {
    const community = require("./communityController");
    const jwtMiddleware = require("../../../config/jwtMiddleware");

    // 게시판 글 불러옥기
    app.get("/api/kauboard/community/get-articles", community.getAllBoardPosts);

    // 게시판 글 업로드
    app.post("/api/kauboard/community/add-article", community.addBoardPost);

    // 게시판 글 삭제
    app.post("/api/kauboard/community/delete-article", community.deleteArticle);

    // 게시물 댓글 불러옥기
    app.post("/api/kauboard/community/get-comments", community.getAllPostComments);

    // 댓글 업로드
    app.post("/api/kauboard/community/add-comments", community.addPostComments);

    // 댓글 삭제
    app.post("/api/kauboard/community/delete-comment", community.deleteArticleComment);

    // 공감 수 업데이트
    app.post("/api/kauboard/community/update-votes", community.updatePostVotes);
};
