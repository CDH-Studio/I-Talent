/* eslint-disable no-underscore-dangle */

const test = {
  backendAddress: "",
  enableErrorRedirect: true,
  keycloakServerUrl: "",
  manageKeycloakAddress: "",
  keycloakClientId: "",
  drupalSite:"",
};

const runtime = () => ({
  backendAddress: window._env.REACT_APP_API_ADDRESS,
  enableErrorRedirect: true,
  keycloakServerUrl: window._env.REACT_APP_KEYCLOAK_SERVER_URL,
  manageKeycloakAddress: `${window._env.REACT_APP_KEYCLOAK_SERVER_URL}/admin/individual/console/#/realms/individual/users`,
  keycloakClientId: window._env.REACT_APP_KEYCLOAK_CLIENT_ID,
  drupalSite: window._env.DRUPAL_WEBSITE_URL
});

const config = () => {
  if (window._env) {
    return runtime();
  }
  return test;
};

export default config();
