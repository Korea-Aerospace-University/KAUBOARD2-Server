module.exports= function(app) {
    const virus = require('./virusController');

    app.get('/virus', virus.getVirusInfo);
}