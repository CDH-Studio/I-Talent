const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { keycloak, sessionInstance } = require('./auth/keycloak');
const database = require('./database/config/database');
const router = require('./router/router');

const app = express();

const port = process.env.PORT || 8080;

dotenv.config();

database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(sessionInstance);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Authorization, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(keycloak.middleware());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(keycloak.middleware({ logout: '/' }));
app.listen(port, () => console.log(`Magic happens on port ${port}`));

// FIXME: create the get employee info function
// router.get(
//   "/getEmployeeInfo/:searchValue",
//   keycloak.protect(),
//   async (req, res) => {
//     const { searchValue } = req.params;
//     const data = await geds.getEmployeeInfo(searchValue);
//     res.json(JSON.parse(data.body));
//   }
// );
