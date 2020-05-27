const models = require('../../database/models');

const User = models.user;

function generateNameInitials(name) {
  const i = name.lastIndexOf(' ') + 1;
  return name.substring(0, 1) + name.substring(i, i + 1);
}

// FIXME: Refactor
function generateAvatarColor(userAcronym) {
  let hash = 0;
  const s = 90;
  const l = 45;
  for (let i = 0; i < userAcronym.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = userAcronym.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

async function getUser(request, response) {
  response.status(200).json(await User.findAll());
}

async function getUserById(request, response) {
  const { id } = request.params;
  response.status(200).json(await User.findOne({ where: { id: id } }));
}

async function createUser(request, response) {
  const acronym = generateNameInitials(request.body.name);
  const color = generateAvatarColor(acronym);

  await User.findOrCreate({
    where: { email: request.body.email },
    defaults: {
      name: request.body.name,
      nameInitials: acronym,
      avatarColor: color,
    },
  }).then(async ([user, created]) => {
    const hasProfile = !((await user.getProfile()) == null);
    const resData = { user, created, hasProfile };
    response.status(200).json(resData);
  });
}
module.exports = {
  getUser,
  getUserById,
  createUser,
};
