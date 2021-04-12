const http = require("http");

function setAwake() {
  http.get("http://서버주소.herokuapp.com");
};

module.exports = setAwake


