export default {
  backendAddress: process.env.REACT_APP_API_ADDRESS,
  enableErrorRedirect: true,
  manageKeycloakAddress: `${process.env.REACT_APP_KEYCLOAK_AUTH_SERVER_URL}/admin/individual/console/#/realms/individual/users`,
};
