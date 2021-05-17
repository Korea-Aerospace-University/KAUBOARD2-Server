const jwtMiddleware = require("../../../config/jwtMiddleware");
const noticeService = require("../../app/Notice/noticeService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const regexEmail = require("regex-email");
const { emit } = require("nodemon");

/**
 * API Name : 공지 등록 페이지 불러오기
 * [GET] /notices/main
 */
exports.getSubmitPage = (req, res, next) => {
  res.sendFile(
    "api-server-node-js-final 2/statics/html/home_notice_upload.html",
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

  return res.send(createNoticeResponse);
};
