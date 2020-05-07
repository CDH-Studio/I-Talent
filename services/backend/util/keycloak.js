const Keycloak = require("keycloak-connect");
const session = require("express-session");

// Configure session to use memoryStore and Setup keycloak middleware to use the session memoryStore.
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

require("dotenv").config();

const sessionInstance = session({
  secret: process.env.KEYCLOAK_SECRET,
  resave: false,
  saveUninitialized: true,
  store: memoryStore
});

module.exports = { keycloak, sessionInstance };
