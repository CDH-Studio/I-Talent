/* eslint-disable  no-underscore-dangle */

const test = {
  backendAddress: "",
  drupalSite: "",
  enableErrorRedirect: true,
  keycloakClientId: "",
  keycloakServerUrl: "",
  manageKeycloakAddress: "",
};

const runtime = () => ({
  backendAddress: window.__ENV.REACT_APP_API_ADDRESS,
  drupalSite: window.__ENV.REACT_APP_DRUPAL_WEBSITE_URL,
  enableErrorRedirect: true,
  keycloakClientId: window.__ENV.REACT_APP_KEYCLOAK_CLIENT_ID,
  keycloakServerUrl: window.__ENV.REACT_APP_KEYCLOAK_SERVER_URL,
  manageKeycloakAddress: `${window.__ENV.REACT_APP_KEYCLOAK_SERVER_URL}/admin/individual/console/#/realms/individual/users`,
});

const config = () => {
  if (window.__ENV) {
    return runtime();
  }
  return test;
};

export default config();
