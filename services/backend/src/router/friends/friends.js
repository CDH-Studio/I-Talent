const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const friends = require("../../core/friends/friends");

const { UUIDValidator } = require("./validator");

const friendsRouter = Router();

friendsRouter
  .route("/:id")
  .get(keycloak.protect(), UUIDValidator, friends.getFriendById)
  .post(keycloak.protect(), UUIDValidator, friends.addFriend)
  .delete(keycloak.protect(), UUIDValidator, friends.removeFriend);

module.exports = friendsRouter;
