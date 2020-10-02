const runtimeConfig = {
  backendAddress: "http://localhost:8080/",
  enableErrorRedirect: true,
  keycloakServerUrl: "https://sso-dev.ised-isde.canada.ca/auth",
  manageKeycloakAddress: `https://sso-dev.ised-isde.canada.ca/auth/admin/individual/console/#/realms/individual/users`,
  keycloakClientId: "upskill-client",
};

export default runtimeConfig;
