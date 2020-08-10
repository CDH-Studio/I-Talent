const { validationResult } = require("express-validator");
const _ = require("lodash");
const prisma = require("../../database");
const config = require("../../config");

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

function getNameInitials(firstName, lastName) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}

async function getUserById(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;

    if (request.kauth.grant.access_token.content.sub === id) {
      const user = await prisma.user.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          avatarColor: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
          signupStep: true,
          preferredLanguage: true,
        },
      });

      if (user) {
        user.nameInitials = getNameInitials(user.firstName, user.lastName);
      }

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
    response.status(500).json("Unable to get profile");
  }
}

async function createUser(request, response) {
  try {
    validationResult(request).throw();

    const { name, firstName, lastName, email } = request.body;
    const { id } = request.params;

    if (request.kauth.grant.access_token.content.sub === id) {
      const user = await prisma.user.create({
        data: {
          id,
          name,
          email,
          firstName: _.upperFirst(firstName),
          lastName: _.upperFirst(lastName),
          avatarColor: generateAvatarColor(),
          visibleCards: { create: {} },
        },
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          avatarColor: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
          signupStep: true,
        },
      });

      response.status(200).json({
        ...user,
        nameInitials: getNameInitials(firstName, lastName),
      });
      return;
    }
    response
      .status(403)
      .json({ data: "Access to private account has been denied." });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to create profiles");
  }
}

async function deleteUser(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;

    const isAdmin =
      request.kauth.grant.access_token.content.resource_access[
        config.KEYCLOAK_CLIENT_ID
      ] &&
      request.kauth.grant.access_token.content.resource_access[
        config.KEYCLOAK_CLIENT_ID
      ].roles.includes("manage-users");
    const isUser = request.kauth.grant.access_token.content.sub === id;

    if (isAdmin || isUser) {
      await Promise.all([
        prisma.competency.deleteMany({ where: { userId: id } }),
        prisma.mentorshipSkill.deleteMany({ where: { userId: id } }),
        prisma.skill.deleteMany({ where: { userId: id } }),
        prisma.developmentalGoal.deleteMany({ where: { userId: id } }),
        prisma.secondLangProf.deleteMany({ where: { userId: id } }),
        prisma.organization.deleteMany({ where: { userId: id } }),
        prisma.education.deleteMany({ where: { userId: id } }),
        prisma.experience.deleteMany({ where: { userId: id } }),
        prisma.relocationLocation.deleteMany({ where: { userId: id } }),
      ]);
      await prisma.user.delete({ where: { id } });
    } else {
      response
        .status(403)
        .json({ data: "Access to delete specified account has been denied." });
      return;
    }

    response.status(200).send("Successfully deleted the specified account");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to create profiles");
  }
}

module.exports = {
  getUserById,
  createUser,
  deleteUser,
};
