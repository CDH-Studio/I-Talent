function generateAvatarColor(userAcronym) {
  let hash = 0;
  const s = 90;
  const l = 45;
  for (let i = 0; i < userAcronym.length; i++) {
    hash = userAcronym.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

module.exports = generateAvatarColor;
