const moment = require("moment");

function normalizeDate(date, startOf) {
  if (date === null) {
    return date;
  }

  return date ? moment(date).startOf(startOf).toISOString() : undefined;
}

module.exports = {
  normalizeDate,
};
