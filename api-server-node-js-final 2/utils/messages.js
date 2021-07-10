const moment = require("moment");

function formatMessage(user, message) {
  return {
    user,
    message,
    time: moment().format("h:mm a"),
  };
}

module.exports = formatMessage;
