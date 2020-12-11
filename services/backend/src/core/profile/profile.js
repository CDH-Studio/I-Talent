const {
  isKeycloakUser,
  viewPrivateProfile,
  getKeycloakUserId,
} = require("../../utils/keycloak");
const getFullProfile = require("./util/getProfile");
const formatProfileResult = require("./util/formatProfileResult");
const filterProfileVisibility = require("./util/filterProfileVisibility");
const updateProfileInfo = require("./util/updateProfile");

async function updateProfile(request, response) {
  const { id } = request.params;
  const { language } = request.query;

  if (isKeycloakUser(request, id)) {
    await updateProfileInfo(request, id, language);

    response.sendStatus(204);
  } else {
    response.sendStatus(403);
  }
}

async function getPrivateProfileById(request, response) {
  const { id } = request.params;
  const { language } = request.query;

  if (isKeycloakUser(request, id)) {
    const fullProfile = await getFullProfile(id, language);
    const filter = formatProfileResult(fullProfile, language);

    response.status(200).json(filter);
  } else {
    response.sendStatus(403);
  }
}

async function getPublicProfileById(request, response) {
  const userId = getKeycloakUserId(request);
  const { id } = request.params;
  const { language } = request.query;

  const fullProfile = await getFullProfile(id, language);

  if (fullProfile.status !== "ACTIVE" && !viewPrivateProfile(request)) {
    response.sendStatus(404);
    return;
  }

  let result = formatProfileResult(fullProfile, language);
  // filter the visibility of cards if user does not have elevated permission
  if (!viewPrivateProfile(request)) {
    result = filterProfileVisibility(request, result, userId);
  }

  response.status(200).json(result);
}

module.exports = {
  updateProfile,
  getPublicProfileById,
  getPrivateProfileById,
};
