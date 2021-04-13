const http = require("http");

function setAwake() {
  http.get("https://kau-project.herokuapp.com/contents");
};

module.exports = setAwake


