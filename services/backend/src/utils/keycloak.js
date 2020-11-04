const config = require("../config");

const hasContent = (request) =>
  request &&
  request.kauth &&
  request.kauth.grant &&
  request.kauth.grant.access_token &&
  request.kauth.grant.access_token.content;

const hasResource = (request) =>
  hasContent(request) &&
  request.kauth.grant.access_token.content.resource_access &&
  request.kauth.grant.access_token.content.resource_access[
    config.KEYCLOAK_CLIENT_ID
  ] &&
  request.kauth.grant.access_token.content.resource_access[
    config.KEYCLOAK_CLIENT_ID
  ].roles;

/**
 * Checksi if the `view-private-profile` role is assigned to the current user
 *
 * @param {Object} request
 */
const viewPrivateProfile = (request) =>
  hasResource(request) &&
  request.kauth.grant.access_token.content.resource_access[
    config.KEYCLOAK_CLIENT_ID
  ].roles.includes("view-private-profile");

/**
 * Checksi if the `view-admin-console` role is assigned to the current user
 *
 * @param {Object} request
 */
const viewAdminConsole = (request) =>
  hasResource(request) &&
  request.kauth.grant.access_token.content.resource_access[
    config.KEYCLOAK_CLIENT_ID
  ].roles.includes("view-admin-console");

/**
 * Checksi if the `manage-users` role is assigned to the current user
 *
 * @param {Object} request
 */
const manageUsers = (request) =>
  hasResource(request) &&
  request.kauth.grant.access_token.content.resource_access[
    config.KEYCLOAK_CLIENT_ID
  ].roles.includes("manage-users");

/**
 * Checksi if the `manage-options` role is assigned to the current user
 *
 * @param {Object} request
 */
const manageOptions = (request) =>
  hasResource(request) &&
  request.kauth.grant.access_token.content.resource_access[
    config.KEYCLOAK_CLIENT_ID
  ].roles.includes("manage-options");

/**
 * Checks the user id stored in keycloak
 *
 * @param {Object} request
 */
const getKeycloakUserId = (request) =>
  hasContent(request) && request.kauth.grant.access_token.content.sub;

/**
 * Checks if the id is the same as in the keycloak request
 *
 * @param {Object} request
 * @param {string} id
 */
const isKeycloakUser = (request, id) =>
  typeof id === "string" &&
  hasContent(request) &&
  getKeycloakUserId(request) === id;

module.exports = {
  viewPrivateProfile,
  viewAdminConsole,
  manageUsers,
  manageOptions,
  getKeycloakUserId,
  isKeycloakUser,
};
