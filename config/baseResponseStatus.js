module.exports = {
    // Success
    SUCCESS: { isSuccess: true, code: 1000, message: "성공" },

    // Common
    TOKEN_EMPTY: {
        isSuccess: false,
        code: 2000,
        message: "JWT 토큰을 입력해주세요.",
    },
    TOKEN_VERIFICATION_FAILURE: {
        isSuccess: false,
        code: 3000,
        message: "JWT 토큰 검증 실패",
    },
    TOKEN_VERIFICATION_SUCCESS: {
        isSuccess: true,
        code: 1001,
        message: "JWT 토큰 검증 성공",
    },

    //Request error
    NOTICE_TITLE_EMPTY: {
        isSuccess: false,
        code: 2001,
        message: "제목을 입력해주세요",
    },
    NOTICE_CONTENTS_EMPTY: {
        isSuccess: false,
        code: 2002,
        message: "내용을 입력해주세요",
    },
    NOTICE_TITLE_LENGTH: {
        isSuccess: false,
        code: 2003,
        message: "제목길이는 최대 30자입니다",
    },
    NOTICE_CONTENTS_LENGTH: {
        isSuccess: false,
        code: 2004,
        message: "내용길이는 최대 300자입니다",
    },

    // SIGNUP
    SIGNUP_EMAIL_EMPTY: {
        isSuccess: false,
        code: 2005,
        message: "이메일을 입력해주세요",
    },
    SIGNUP_EMAIL_LENGTH: {
        isSuccess: false,
        code: 2006,
        message: "이메일은 45자리 미만으로 입력해주세요.",
    },
    SIGNUP_EMAIL_ERROR_TYPE: {
        isSuccess: false,
        code: 2007,
        message: "이메일을 형식을 정확하게 입력해주세요.",
    },
    SIGNUP_PASSWORD_EMPTY: {
        isSuccess: false,
        code: 2008,
        message: "비밀번호를 입력 해주세요.",
    },
    SIGNUP_PASSWORD_LENGTH: {
        isSuccess: false,
        code: 2009,
        message: "비밀번호는 6~20자리를 입력해주세요.",
    },
    SIGNUP_NAME_EMPTY: {
        isSuccess: false,
        code: 2010,
        message: "이름을 입력 해주세요.",
    },
    SIGNUP_PASSWORD_ERROR_TYPE: {
        isSuccess: false,
        code: 2011,
        message: "비밀번호는 특수문자, 영문자, 숫자를 포함해주세요"
    },

    // SIGNIN
    SIGNIN_EMAIL_EMPTY: {
        isSuccess: false,
        code: 2012,
        message: "이메일을 입력해주세요",
    },
    SIGNIN_EMAIL_ERROR_TYPE: {
        isSuccess: false,
        code: 2013,
        message: "이메일의 형식을 정확하게 입력해주세요.",
    },
    SIGNIN_PASSWORD_EMPTY: {
        isSuccess: false,
        code: 2014,
        message: "비밀번호를 입력 해주세요.",
    },

    // Auth
    AUTH_EMAIL_EMPTY: {
        isSuccess: false,
        code: 2015,
        message: "이메일을 입력해주세요."
    },
    AUTH_EMAIL_LENGTH: { 
        isSuccess: false,
        code: 2016,
        message: "이메일은 45자 이내로 입력해주세요."
    },
    AUTH_EMAIL_ERRORTYPE: {
        isSuccess: false,
        code: 2017,
        message: "이메일의 형식을 정확하게 입력해주세요."
    },

    NOTICE_TYPE_EMPTY: {
        isSuccess: false,
        code: 2018,
        message: "type을 입력해주세요."
    },
    NOTICE_TYPE_ERROR: {
        isSuccess: false,
        code: 2019,
        message: "잘못된 type입니다."
    },

    KAUNOTICE_BODY_EMPTY: {
        isSuccess: false, 
        code: 2020,
        message: "body를 입력해주세요."
    },
    KAUNOTICE_CATEGORY_EMPTY: {
        isSuccess: false,
        code: 2021, 
        message: "category를 입력해주세요."
    },
    KAUNOTICE_CATEGORY_ERROR: {
        isSuccess: false,
        code: 2022,
        message: "category를 확인해주세요."
    },
    
    // Response error

    // SignUp
    SIGNUP_REDUNDANT_EMAIL: {
        isSuccess: false,
        code: 3001,
        message: "중복된 이메일입니다.",
    },

    // SignIn
    SIGNIN_EMAIL_WRONG: {
        isSuccess: false,
        code: 3002,
        message: "이메일이 잘못되었습니다.",
    },
    SIGNIN_PASSWORD_WRONG: {
        isSuccess: false,
        code: 3003,
        message: "비밀번호가 잘못되었습니다.",
    },

    // Admin
    SIGNIN_INACTIVE_ADMIN: {
        isSuccess: false,
        code: 3004,
        message: "승인 대기 중인 계정입니다."
    },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
    SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },
};
