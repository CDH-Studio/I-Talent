const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../database/client");

const prisma = new PrismaClient();

function generateAvatarColor() {
  const colours = [
    "#0bdaa3",
    "#da680b",
    "#7a0bda",
    "#2a0bda",
    "#c20bda",
    "#da0b3f",
    "#8e44ad",
    "#98ad44",
    "#ad4497",
    "#ad5944",
    "#ad4463",
  ];
  return colours[Math.floor(Math.random() * colours.length)];
}

async function getUsers(request, response) {
  prisma.users
    .findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        avatarColor: true,
        nameInitials: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    .then((result) => response.status(200).json(result))
    .catch((error) => {
      console.log(error);
      response.status(500).json("Unable to get profiles");
    });
}

async function getUserById(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;

    if (request.kauth.grant.access_token.content.sub === id) {
      const users = await prisma.users.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          avatarColor: true,
          nameInitials: true,
          createdAt: true,
          updatedAt: true,
          signupStep: true,
        },
      });
      response.status(200).json(users);
      return;
    }

    response
      .status(403)
      .json({ data: "Access to private account has be denied." });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to get profile");
  }
}

async function createUser(request, response) {
  try {
    validationResult(request).throw();

    const { name, firstName, lastName, email } = request.body;
    const { id } = request.params;

    if (request.kauth.grant.access_token.content.sub === id) {
      const user = await prisma.users.create({
        data: {
          id,
          name,
          email,
          firstName,
          lastName,
          avatarColor: generateAvatarColor(),
          nameInitials: `${firstName.charAt(0)}${lastName.charAt(0)}`,
          visibleCards: { create: {} },
        },
      });

      response.status(200).json(user);
      return;
    }
    response
      .status(403)
      .json({ data: "Access to private account has be denied." });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to create profiles");
  }
}

async function checkExistence(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;

    if (request.kauth.grant.access_token.content.sub === id) {
      const count = await prisma.users.count({
        where: { id },
      });

      response.status(200).json(count);
      return;
    }

    response
      .status(403)
      .json({ data: "Access to private account has be denied." });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to find user");
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  checkExistence,
};
