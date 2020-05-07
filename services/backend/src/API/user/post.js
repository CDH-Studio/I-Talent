const Models = require("../../models");
const generateNameInitials = require("./util/generateNameInitials");
const generateAvatarColor = require("./util/generateAvatarColor");

const User = Models.user;

const createUser = async (request, response) => {
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
};

module.exports = {
  createUser,
};
