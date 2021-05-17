module.exports = function(app) {
    const admin = require('./adminController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 관리자 로그인 API
    app.post('/admin/login', admin.adminLogin);
}