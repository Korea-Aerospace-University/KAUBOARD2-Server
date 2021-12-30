const { response, errResponse } = require("../../../config/response");
const regexEmail = require("regex-email")
const baseResponse = require("../../../config/baseResponseStatus")

exports.emailCheck = async function(email) {
    if (!email) {
        return errResponse(baseResponse.AUTH_EMAIL_EMPTY)
    } else if (email.length > 45) {
        return errResponse(baseResponse.AUTH_EMAIL_LENGTH)
    } else if (!regexEmail.test(email)) {
        return errResponse(baseResponse.AUTH_EMAIL_ERRORTYPE)
    } else {
        return response(baseResponse.SUCCESS);
    }
}