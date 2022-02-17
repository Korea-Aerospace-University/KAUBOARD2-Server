const jwtMiddleware = require("../../../config/jwtMiddleware");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const communityProvider = require("./communityProvider");
const communityService = require("./communityService");
const axios = require("axios");
const { logger } = require("../../../config/winston");
const { redirect } = require("express/lib/response");


/*
    API Name : 전체 게시판 글 조회 API
    [GET] /get-articles
*/
exports.getAllBoardPosts = async function (req, res) {

    const resultResponse = await communityProvider.getAllBoardPosts();
    return res.send(resultResponse);
}

/*
    API Name : 전체 게시판 글 추가 API
    [POST] /add-article
*/
exports.addBoardPost = async function (req, res) {
    const resultResponse = await communityService.addBoardPost(req.body);
    return res.send(resultResponse);
}

/*
    API Name : 전체 게시판 글 삭제 API
    [POST] /delet-article
*/
exports.deleteArticle = async function (req, res) {
    const resultResponse = await communityService.deleteArticle(req.body);
    return res.send(resultResponse);
}


/*
    API Name : 게시글 댓글 조회 API
    [GET] /get-comments
*/
exports.getAllPostComments = async function (req, res) {

    const resultResponse = await communityProvider.getAllPostComments(req.body);
    return res.send(resultResponse);
}

/*
    API Name : 게시글 댓글 추가 API
    [POST] /add-comments
*/
exports.addPostComments = async function (req, res) {
    const resultResponse = await communityService.addPostComments(req.body);
    return res.send(resultResponse);
}

/*
    API Name : 게시글 댓글 추가 API
    [POST] /delete-comment
*/
exports.deleteArticleComment = async function (req, res) {
    const resultResponse = await communityService.deleteArticleComment(req.body);
    return res.send(resultResponse);
}

/*
    API Name : 공감 수 업데이트 API
    [POST] /update-votes
*/
exports.updatePostVotes = async function (req, res) {
    const resultResponse = await communityService.updatePostVotes(req.body);
    return res.send(resultResponse);
}
// /*
//     API Name : 공지 수정 API
//     [GET] /notices
// */
// exports.patchNotice = async function (req, res) {

//     /**
//      * Headers: x-access-token
//      * Body: title, contents, pinned, status
//      */
//     var adminIdx = 1; //jwt로 변경하기
//     const noticeIdx = req.params.noticeIdx
//     const { title, contents } = req.body;

//     // 빈 값 체크
//     if (!title) return res.send(response(baseResponse.NOTICE_TITLE_EMPTY));
//     if (!contents) return res.send(response(baseResponse.NOTICE_CONTENTS_EMPTY));

//     // 길이 체크
//     if (title.length > 30)
//         return res.send(response(baseResponse.NOTICE_TITLE_LENGTH));
//     if (contents.length > 300)
//         return res.send(response(baseResponse.NOTICE_CONTENTS_LENGTH));
//     const createNoticeResponse = await noticeService.updateNotice(
//         noticeIdx,
//         title,
//         contents
//     );
//     console.log(createNoticeResponse)
//     res.redirect('/api/kauboard/view/notices')
// };

// /*
//    API Name : 공지 삭제
//    [GET] /notices
// */
// exports.deleteNotice = async function (req, res) {

//     const noticeIdx = req.params.noticeIdx;
//     const resultResponse = await noticeService.deleteNotice(noticeIdx);
//     res.redirect("/api/kauboard/view/notices")
// }

// /*
//     API Name: 학교 뉴스 조회 API
//     [GET] /kaunews
// */
// exports.getKauNews = async function (req, res) {

//     const url = "http://www.hangkong.ac.kr/proxyUrlConnector.jsp?targetUrl=http://old.kau.ac.kr/page/kauspace/kaunews_list_pick.jsp?noticeYN=Y"
//     axios.get(url).then(rsp => {
//         res.send(response(baseResponse.SUCCESS, rsp.data))
//     }).catch(function (err) {
//         logger.error(`GET KAU NOTICES ERROR\n: ${err.message}`);
//         res.send(response(baseResponse.SERVER_ERROR));
//     })
// }

// /*
//     API Name: 학교 공지 조회 API
//     [POST] /kaunotices?category=
// */
// exports.getKauNotices = async function (req, res) {
//     /*
//         Query String: category
//         Body: siteFlag, bbsId, pageIndex, bbsAuth
//     */
//     const category = req.query.category;
//     const { siteFlag, bbsId, pageIndex, bbsAuth } = req.body;

//     // validation
//     if (!category) {
//         return res.send(errResponse(baseResponse.KAUNOTICE_CATEGORY_EMPTY));
//     } else if (category != 'department' && category != 'general') {
//         return res.send(errResponse(baseResponse.KAUNOTICE_CATEGORY_ERROR));
//     }

//     if (!siteFlag || !bbsId || !pageIndex || !bbsAuth) {
//         return res.send(errResponse(baseResponse.KAUNOTICE_BODY_EMPTY));
//     }

//     // category에 따라서 전송 url 달라짐
//     const url = category == 'department' ? "http://college.kau.ac.kr/web/bbs/bbsListApi.gen" : "http://www.hangkong.ac.kr/web/bbs/bbsListApi.gen";

//     const data = {
//         siteFlag: siteFlag,
//         bbsId: bbsId,
//         pageIndex: pageIndex,
//         bbsAuth: bbsAuth
//     };

//     // 공지 보내주는 api와 연결
//     axios.post(url, data).then(rsp => {
//         var noticeList = [];
//         for (i of rsp.data.resultList) {
//             notice = {
//                 idx: i.nttId,
//                 createdAt: i.frstRegisterPnttm,
//                 title: i.nttSj,
//                 contents: i.nttCn
//             }
//             noticeList.push(notice)
//         }
//         res.send(response(baseResponse.SUCCESS, noticeList))
//     }).catch(function (err) {
//         logger.error(`GET KAU NOTICES ERROR\n: ${err.message}`);
//         res.send(response(baseResponse.SERVER_ERROR));
//     })
// }
