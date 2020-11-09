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
        User: {
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
        release: true,
        User: {
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

module.exports = {
  createBug,
  getBugs,
};
