require('dotenv').config();

const KeycloakConnect = require('keycloak-connect');
const session = require('express-session');

// Configure session to use memoryStore and Setup keycloak middleware to
// use the session memoryStore.
const memoryStore = new session.MemoryStore();

const keycloak = new KeycloakConnect(
  { store: memoryStore },
  {
    realm: 'individual',
    'bearer-only': true,
    'auth-server-url': process.env.KEYCLOAK_AUTH_SERVER_URL,
    'ssl-required': 'external',
    resource: 'upskill-api',
    'confidential-port': 0,
  }
);

const sessionInstance = session({
  secret: process.env.KEYCLOAK_SECRET,
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
});

module.exports = { keycloak, sessionInstance };
