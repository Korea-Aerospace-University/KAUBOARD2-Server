const axios = require("axios");
const path = require('path');
const cheerio = require('cheerio');
const http = require("http")
const https = require("https")
const qs = require('qs')

exports.getLoginSucess = async function(req, res) {
    arg = req.body
    const httpAgent = new http.Agent({ keepAlive: true});
    const httpsAgent = new https.Agent({ keepAlive: true });
    const instance = axios.create({
        baseURL: 'https://lms.kau.ac.kr/',
        withCredentials: true,
        httpAgent,
        httpsAgent,
        timeout: 5000
    })
    const data = {"username":arg["id"],"password":arg["pwd"]}
    const response = await instance({
        method: 'POST',
        data: qs.stringify(data),
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url:"/login/index.php",
        maxRedirects:0,
        withCredentials:true,
        validateStatus: function (status) {
        return status >= 200 && status <= 303
        }
    })
    
    const $ = cheerio.load(response.data);
    const redirect = $('a')[0].attribs.href
    const isLoginSuccess = (new URL(redirect)).searchParams.get('testsession')
    console.log(isLoginSuccess)
    if(!isLoginSuccess)
        res.send(false)
    
    
    const cookie = response.headers['set-cookie'][1].split(";")[0].split('=')[1]
    
    // mainWindow.webContents.session.cookies.set({
    //   name : 'MoodleSession',
    //   value : cookie,
    //   domain : 'lms.kau.ac.kr',
    //   path : '/',
    //   httpOnly : true,
    //   secure : false,
    //   url : 'http://lms.kau.ac.kr'
    // })
    // localStorage.setItem('MoodleSession', JSON.stringify({
    //     name : 'MoodleSession',
    //     value : cookie,
    //     domain : 'lms.kau.ac.kr',
    //     path : '/',
    //     httpOnly : true,
    //     secure : false,
    //     url : 'http://lms.kau.ac.kr'
    // }))

    // axios.get(redirect, {headers: {
    //     Cookie : `MoodleSession=${cookie}`
    // }})
    res.send(true)
      
};