const { validationResult } = require("express-validator");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function createBug(request, response) {
  try {
    validationResult(request).throw();

    const { description, location } = request.body;
    const userId = getKeycloakUserId(request);

    await prisma.bugs.create({
      data: {
        description,
        location,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    response.status(200).send("Successfully created a new bug");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to create bug");
  }
}

async function getBugs(request, response) {
  try {
    const bugs = await prisma.bugs.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        description: true,
        location: true,
        status: true,
        appVersion: true,
        githubIssue: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    response.status(200).json(bugs);
  } catch (error) {
    console.log(error);
    response.status(500).json("Unable to get bugs");
  }
}

async function updateBug(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;
    const { description, location, status, githubIssue } = request.body;

    await prisma.bugs.update({
      where: {
        id,
      },
      data: {
        description,
        location,
        status,
        githubIssue,
      },
    });

    response.status(200).send("Successfully created a new bug");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to update specified bug");
  }
}

module.exports = {
  createBug,
  getBugs,
  updateBug,
};
