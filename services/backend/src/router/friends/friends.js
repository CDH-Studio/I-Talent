const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const friends = require("../../core/friends/friends");

const friendsRouter = Router();

friendsRouter
  .route("/:id")
  .get(keycloak.protect(), friends.getFriendById)
  .post(keycloak.protect(), friends.addFriend)
  .delete(keycloak.protect(), friends.removeFriend);

friendsRouter
  .route("/allFriends")
  .get(keycloak.protect(), friends.getAllFriends);

module.exports = friendsRouter;
