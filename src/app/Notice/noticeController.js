const jwtMiddleware = require("../../../config/jwtMiddleware");
const noticeService = require("../../app/Notice/noticeService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const noticeProvider = require("./noticeProvider");
const regexEmail = require("regex-email");
const axios = require("axios");
const { logger } = require("../../../config/winston");
const { redirect } = require("express/lib/response");

/**
 * API Name : 공지 등록 페이지 불러오기
 * [GET] /notices/main
 */
exports.getSubmitPage = (req, res, next) => {
    res.sendFile(
        "/KAUBOARD2-Server/statics/html/home_notice_upload.html",
        {
            root: "../",
        }
    );
};

/**
 * API Name : 공지 등록 API
 * [POST] /notices
 */
exports.postNotice = async function (req, res) {
    /**
     * Headers: x-access-token
     * Body: title, contents, pinned
     */
    var adminIdx = 1; //jwt로 변경하기
    const { title, contents } = req.body;

    // 빈 값 체크
    if (!title) return res.send(response(baseResponse.NOTICE_TITLE_EMPTY));
    if (!contents) return res.send(response(baseResponse.NOTICE_CONTENTS_EMPTY));

    // 길이 체크
    if (title.length > 30)
        return res.send(response(baseResponse.NOTICE_TITLE_LENGTH));
    if (contents.length > 300)
        return res.send(response(baseResponse.NOTICE_CONTENTS_LENGTH));
    const createNoticeResponse = await noticeService.createNotice(
        adminIdx,
        title,
        contents
    );

    res.redirect('/api/kauboard/view/notices');
};

/*
    API Name : 전체공지 조회 API
*/
exports.getAllNotices = async function (req, res) {

    //관리자용 공지조회 페이지
    //jwt 추가
    const resultResponse = await noticeProvider.getAllNotices();
    return res.render('get_notices', { data: resultResponse });
}

/*
    API Name : 공지 조회 API
    [GET] /notices
*/
exports.getNotices = async function (req, res) {

    //학생용 공지조회 API
    const resultResponse = await noticeProvider.getNotices();
    return res.send(resultResponse);
}

/*
    API Name : 공지 1개 조회 API
    [GET] /notices
*/
exports.getNoticeById = async function (req, res) {

    const noticeIdx = req.params.noticeIdx;
    const resultResponse = await noticeProvider.getNoticeById(noticeIdx);
    return res.render('update_notices', { data: resultResponse });
}

/*
    API Name : 공지 수정 API
    [GET] /notices
*/
exports.patchNotice = async function (req, res) {

    /**
     * Headers: x-access-token
     * Body: title, contents, pinned, status
     */
    var adminIdx = 1; //jwt로 변경하기
    const noticeIdx = req.params.noticeIdx
    const { title, contents } = req.body;

    // 빈 값 체크
    if (!title) return res.send(response(baseResponse.NOTICE_TITLE_EMPTY));
    if (!contents) return res.send(response(baseResponse.NOTICE_CONTENTS_EMPTY));

    // 길이 체크
    if (title.length > 30)
        return res.send(response(baseResponse.NOTICE_TITLE_LENGTH));
    if (contents.length > 300)
        return res.send(response(baseResponse.NOTICE_CONTENTS_LENGTH));
    const createNoticeResponse = await noticeService.updateNotice(
        noticeIdx,
        title,
        contents
    );
    console.log(createNoticeResponse)
    res.redirect('/api/kauboard/view/notices')
};

/*
   API Name : 공지 삭제
   [GET] /notices
*/
exports.deleteNotice = async function (req, res) {

    const noticeIdx = req.params.noticeIdx;
    const resultResponse = await noticeService.deleteNotice(noticeIdx);
    res.redirect("/api/kauboard/view/notices")
}

/*
    API Name: 학교 뉴스 조회 API
    [GET] /kaunews
*/
exports.getKauNews = async function (req, res) {

    const url = "http://www.hangkong.ac.kr/proxyUrlConnector.jsp?targetUrl=http://old.kau.ac.kr/page/kauspace/kaunews_list_pick.jsp?noticeYN=Y"
    axios.get(url).then(rsp => {
        res.send(response(baseResponse.SUCCESS, rsp.data))
    }).catch(function (err) {
        logger.error(`GET KAU NOTICES ERROR\n: ${err.message}`);
        res.send(response(baseResponse.SERVER_ERROR));
    })
}

/*
    API Name: 학교 공지 조회 API
    [POST] /kaunotices?category=
*/
exports.getKauNotices = async function (req, res) {
    /*
        Query String: category
        Body: siteFlag, bbsId, pageIndex, bbsAuth
    */
    const category = req.query.category;
    const { siteFlag, bbsId, pageIndex, bbsAuth } = req.body;

    // validation
    if (!category) {
        return res.send(errResponse(baseResponse.KAUNOTICE_CATEGORY_EMPTY));
    } else if (category != 'department' && category != 'general') {
        return res.send(errResponse(baseResponse.KAUNOTICE_CATEGORY_ERROR));
    }

    if (!siteFlag || !bbsId || !pageIndex || !bbsAuth) {
        return res.send(errResponse(baseResponse.KAUNOTICE_BODY_EMPTY));
    }

    // category에 따라서 전송 url 달라짐
    const url = category == 'department' ? "http://college.kau.ac.kr/web/bbs/bbsListApi.gen" : "http://www.hangkong.ac.kr/web/bbs/bbsListApi.gen";

    const data = {
        siteFlag: siteFlag,
        bbsId: bbsId,
        pageIndex: pageIndex,
        bbsAuth: bbsAuth
    };

    // 공지 보내주는 api와 연결
    axios.post(url, data).then(rsp => {
        var noticeList = [];
        for (i of rsp.data.resultList) {
            notice = {
                idx: i.nttId,
                createdAt: i.frstRegisterPnttm,
                title: i.nttSj,
                contents: i.nttCn
            }
            noticeList.push(notice)
        }
        res.send(response(baseResponse.SUCCESS, noticeList))
    }).catch(function (err) {
        logger.error(`GET KAU NOTICES ERROR\n: ${err.message}`);
        res.send(response(baseResponse.SERVER_ERROR));
    })
}
