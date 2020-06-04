const { Router } = require("express");
const database = require("../../database/config/database");
const models = require("../../database/models");

const test = Router();

test.get("/", (request, response) => {
  console.log("hooray! welcome to our api!");
  response.json({ message: "hooray! welcome to our api!" });
});

test.get("/db/", (request, response) => {
  database
    .authenticate()
    .then(() => {
      response.json({
        message: "Connection has been established successfully.",
      });
    })
    .catch((err) => {
      response.json({ message: `Unable to connect to the database: ${err}` });
    });
});

test.get("/db/users", async (request, response) => {
  models.user
    .findAll()
    .then((result) => {
      if (result)
        response.status(200).json({ message: "user data is visible." });
      response.status(200).json({ message: "user data is not visible." });
    })
    .catch((err) =>
      response
        .status(200)
        .json({ message: `user data is not visible. err: ${err}` })
    );
});

module.exports = test;
