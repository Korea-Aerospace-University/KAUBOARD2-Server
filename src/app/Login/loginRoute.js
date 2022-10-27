module.exports= function(app) {
    const login = require('./loginController');

    app.post('/api/homepage/login', login.getLoginSucess);
}