const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../database/client");

const prisma = new PrismaClient();

async function addConnection(request, response) {
  try {
    validationResult(request).throw();
    const publicUserId = request.params.id;
    const userId = request.kauth.grant.access_token.content.sub;
    if (userId && publicUserId) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          connections: {
            connect: {
              id: publicUserId,
            },
          },
        },
      });
      response.status(200).json("Successfully added connection");
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
    response.status(500).json("Unable to add connection");
  }
}

async function removeConnection(request, response) {
  try {
    validationResult(request).throw();
    const publicUserId = request.params.id;
    const userId = request.kauth.grant.access_token.content.sub;
    if (userId && publicUserId) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          connections: {
            disconnect: {
              id: publicUserId,
            },
          },
        },
      });
      response.status(200).json("Successfully deleted connection");
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
    response.status(500).json("Unable to remove connection");
  }
}

async function getConnectionById(request, response) {
  try {
    validationResult(request).throw();
    const publicUserId = request.params.id;
    const userId = request.kauth.grant.access_token.content.sub;
    if (userId && publicUserId) {
      const connections = await prisma.user.findOne({
        where: {
          id: userId,
        },
        select: {
          connections: { select: { id: true } },
        },
      });
      response.status(200).json({
        status: connections.connections.some(
          (item) => item.id === publicUserId
        ),
      });
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
    response.status(500).json("Unable to get connection");
  }
}

module.exports = {
  addConnection,
  removeConnection,
  getConnectionById,
};
