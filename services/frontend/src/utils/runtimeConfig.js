/* eslint-disable no-underscore-dangle */

const test = {
  backendAddress: "",
  enableErrorRedirect: true,
  keycloakServerUrl: "",
  manageKeycloakAddress: "",
  keycloakClientId: "",
  drupalSite: "",
};

const runtime = () => ({
  backendAddress: window.__ENV.REACT_APP_API_ADDRESS,
  enableErrorRedirect: true,
  keycloakServerUrl: window.__ENV.REACT_APP_KEYCLOAK_SERVER_URL,
  manageKeycloakAddress: `${window.__ENV.REACT_APP_KEYCLOAK_SERVER_URL}/admin/individual/console/#/realms/individual/users`,
  keycloakClientId: window.__ENV.REACT_APP_KEYCLOAK_CLIENT_ID,
  drupalSite: window.__ENV.REACT_APP_DRUPAL_WEBSITE_URL,
});

const config = () => {
  if (window.__ENV) {
    return runtime();
  }
  return test;
};

export default config();
