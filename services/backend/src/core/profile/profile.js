const { validationResult } = require("express-validator");
const {
  isKeycloakUser,
  viewPrivateProfile,
  getKeycloakUserId,
} = require("../../utils/keycloak");
const getFullProfile = require("./util/getProfile");
const filterProfileResult = require("./util/filterProfileResult");
const filterProfileVisibility = require("./util/filterProfileVisibility");
const updateProfileInfo = require("./util/updateProfile");

async function updateProfile(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;
    const { language } = request.query;

    if (isKeycloakUser(request, id)) {
      await updateProfileInfo(request, id, language);

      response.status(200).json("Successfully updated profile");
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

async function getPrivateProfileById(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;
    const { language } = request.query;

    if (isKeycloakUser(request, id)) {
      const fullProfile = await getFullProfile(id, language);
      const filter = filterProfileResult(fullProfile, language);

      response.status(200).json(filter);
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

async function getPublicProfileById(request, response) {
  try {
    validationResult(request).throw();

    const userId = getKeycloakUserId(request);
    const { id } = request.params;
    const { language } = request.query;

    if (userId && id) {
      const fullProfile = await getFullProfile(id, language);

      if (fullProfile.status !== "ACTIVE" && !viewPrivateProfile(request)) {
        response.sendStatus(404);
        return;
      }

      const result = filterProfileResult(fullProfile, language);
      const filteredResults = filterProfileVisibility(request, result, userId);

      response.status(200).json(filteredResults);
      return;
    }

    response.sendStatus(404);
    return;
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error getting information about the users");
  }
}

module.exports = {
  updateProfile,
  getPublicProfileById,
  getPrivateProfileById,
};
