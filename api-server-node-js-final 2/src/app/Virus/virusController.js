const axios = require("axios");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { serviceKey, host } = require("../../../config/virus");

/*
    API Name: 코로나19 현황 가져오기 api
    [GET] /virus
*/
let seoul = [];
let gyeonggi = [];
exports.getVirusInfo = async function(req, res) {
    axios.get(`${host}?${serviceKey}`).then(result => {
        seoul = result.data.seoul;
        gyeonggi = result.data.gyeonggi;
    
        res.send(response(baseResponse.SUCCESS, {'seoul': seoul, 'gyeonggi': gyeonggi}));
    }).catch(function(err) {
        console.log(`GET VIRUSINFO ERROR\n: ${err.message}`);

        res.send(errResponse(baseResponse.SERVER_ERROR));
    })
};