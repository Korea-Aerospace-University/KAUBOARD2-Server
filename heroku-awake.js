const https = require("https");

function setAwake() {
  https.get("https://kau-project.herokuapp.com/");
};

module.exports = setAwake


