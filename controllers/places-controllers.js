const fs = require('fs')

const getSubmitPage = (req, res, next) => {
  res.sendFile('/statics/html/home_notice_upload.html', {root:__dirname + '/..'})
};

const overwriteNotice = (req, res, next) => {
  let data = JSON.stringify(req.body)
  fs.writeFileSync(__dirname + '/../contents/notice.json', data)
  res.redirect('/')
}
const getNotice = (req, res, next) => {
  let rawData = fs.readFileSync('../contents/notice.json')
  let data = JSON.parse(rawData)
  res.send(data)
}



exports.getSubmitPage = getSubmitPage;
exports.overwriteNotice = overwriteNotice;
exports.getNotice = getNotice;
