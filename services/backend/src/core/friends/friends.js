const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../database/client");

const prisma = new PrismaClient();

async function addFriend(request, response) {
  try {
    validationResult(request).throw();
    const friendId = request.params.id;
    const userId = request.kauth.grant.access_token.content.sub;
    if (userId && friendId) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          friends: {
            connect: {
              id: friendId,
            },
          },
        },
      });
      response.status(200).json("Successfully added friend");
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
    response.status(500).json("Unable to add friend");
  }
}

async function removeFriend(request, response) {
  try {
    validationResult(request).throw();
    const friendId = request.params.id;
    const userId = request.kauth.grant.access_token.content.sub;
    if (userId && friendId) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          friends: {
            disconnect: {
              id: friendId,
            },
          },
        },
      });
      response.status(200).json("Successfully deleted friend");
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
    response.status(500).json("Unable to remove friend");
  }
}

async function getFriendById(request, response) {
  try {
    validationResult(request).throw();
    const friendId = request.params.id;
    const userId = request.kauth.grant.access_token.content.sub;
    if (userId && friendId) {
      const friends = await prisma.user.findOne({
        where: {
          id: userId,
        },
        select: {
          friends: { select: { id: true } },
        },
      });
      response.status(200).json({
        friend: friends.friends.some((item) => item.id === friendId),
      });
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
    response.status(500).json("Unable to get friend");
  }
}

async function getAllFriends(request, response) {
  try {
    validationResult(request).throw();
    const userId = request.kauth.grant.access_token.content.sub;
    if (userId) {
      const friends = await prisma.user.findOne({
        where: {
          id: userId,
        },
        select: {
          friends: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
      });
      response.status(200).json(friends);
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
    response.status(500).json("Unable to get friends");
  }
}

module.exports = {
  addFriend,
  removeFriend,
  getFriendById,
  getAllFriends,
};
