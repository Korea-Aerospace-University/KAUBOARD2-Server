module.exports= function(app) {
    const virus = require('./virusController');

    app.get('/api/external/virus', virus.getVirusInfo);
}