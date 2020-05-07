function generateAvatarColor(userAcronym) {
  var hash = 0;
  var s = 90;
  var l = 45;
  for (var i = 0; i < userAcronym.length; i++) {
    hash = userAcronym.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

module.exports = generateAvatarColor;
