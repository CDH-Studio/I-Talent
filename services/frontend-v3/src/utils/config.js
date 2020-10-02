/* eslint-disable no-underscore-dangle */
const runtimeConfig = {
  backendAddress: window._env.REACT_APP_API_ADDRESS,
  enableErrorRedirect: true,
  keycloakServerUrl: window._env.REACT_APP_KEYCLOAK_SERVER_URL,
  manageKeycloakAddress: `${window._env.REACT_APP_KEYCLOAK_SERVER_URL}/admin/individual/console/#/realms/individual/users`,
  keycloakClientId: window._env.REACT_APP_KEYCLOAK_CLIENT_ID,
};

export default runtimeConfig;
