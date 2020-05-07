// BASE SETUP ==========================================================================

// Import the packages we need
const express = require("express"); // call express
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { keycloak, sessionInstance } = require("./util/keycloak");
const sequelizedb = require("./config/database");

const app = express(); // define our app using express

const profile = require("./API/profile");
const user = require("./API/user");
const profileGeneration = require("./API/profileGeneration");
const options = require("./API/options").optionRouter;
const admin = require("./API/admin/router");
const search = require("./API/search");

dotenv.config(); // Config() function reads the .env file and sets the environment variables

// Testing the Postgres Connection
sequelizedb
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Register 'handelbars' extension with The Mustache Express
app.engine(
  "hbs",
  expressHbs({
    extname: "hbs",
    defaultLayout: "layout.hbs",
    relativeTo: __dirname,
  })
);
app.set("view engine", "hbs");
// session
app.use(sessionInstance);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.use(keycloak.middleware());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API ===============================================
const router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api/)
router.get("/", (req, res) => {
  res.json({ message: "hooray! welcome to our api!" });
});

router.get(
  "/getEmployeeInfo/:searchValue",
  keycloak.protect(),
  async (req, res) => {
    const { searchValue } = req.params;
    const data = await geds.getEmployeeInfo(searchValue);
    res.json(JSON.parse(data.body));
  }
);

// User endpoints
router.get("/user/", keycloak.protect(), user.getUser);
router.get("/user/:id", keycloak.protect(), user.getUserById);
router.post("/user/", keycloak.protect(), user.createUser);

// Profile endpoints
router.get("/profile/", keycloak.protect(), profile.getProfile);
router
  .route("/profile/:id")
  .get(keycloak.protect(), profile.getPublicProfileById)
  .post(keycloak.protect(), profile.createProfile)
  .put(keycloak.protect(), profile.updateProfile);

router
  .route("/private/profile/:id")
  .get(keycloak.protect(), profile.getPrivateProfileById);

router
  .route("/private/profile/status/:id")
  .get(keycloak.protect(), profile.getProfileStatusById);

// Admin endpoints
router.use("/admin", admin);

router.use("/option", options);

router.get("/profGen/:id", keycloak.protect(), profileGeneration.getGedsAssist);

// Search routes
router.get("/search/fuzzySearch/", keycloak.protect(), search);

// REGISTER OUR ROUTES ===============================================
// Note: All of our routes will be prefixed with /api

app.use("/api", router);

// Set the logout route to use keycloak middleware to kill session
app.use(keycloak.middleware({ logout: "/" }));

// START THE SERVER ==================================================
app.listen(port);
console.log("Magic happens on port " + port);
