const runtimeConfig =
  typeof window !== "undefined"
    ? {
        backendAddress: window.env.apiAddress,
        enableErrorRedirect: true,
        keycloakServerUrl: window.env.keycloakServerUrl,
        manageKeycloakAddress: `${window.env.keycloakServerUrl}/admin/individual/console/#/realms/individual/users`,
        keycloakClientId: window.env.keycloakClientId,
      }
    : {
        backendAddress: process.env.API_ADDRESS,
        enableErrorRedirect: true,
        keycloakServerUrl: process.env.KEYCLOAK_SERVER_URL,
        manageKeycloakAddress: `${process.env.KEYCLOAK_SERVER_URL}/admin/individual/console/#/realms/individual/users`,
        keycloakClientId: process.env.KEYCLOAK_CLIENT_ID,
      };

export default runtimeConfig;
