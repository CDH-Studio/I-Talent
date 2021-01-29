#### Changes introduced

<!-- Explain briefly in a small paragraph or in bullet form the changes this PR brings to
     the application -->

#### Related issue(s)

<!-- If this PR fixes/closes an issue, please prepend that issue number with one of the github
     closing keywords (ex: `fixes`, `closes`, ...) -->

#### Screenshots (if applicable)

<!-- If you have made UI changes to the application, include a screenshot and if the change
     involves movement, include a GIF. If the UI changes when the application is in mobile view,
     show a mobile screenshot too. -->

#### Checklist

If the database has been modified:

- [ ] Update database diagram <!-- Updated diagram located in the backend, at `./src/docs/I-Talent database.xml`, with draw.io and updated the png image at `./src/docs/I-Talent database.png` -->
- [ ] Create new migration <!-- Ran `yarn migrate:create` in backend docker container -->

If API endpoints has been modified:

- [ ] Update backend documentation <!-- Updated corresponding swagger documentation in the routers -->
- [ ] Create/Update validators for the API endpoints <!-- Restrict and sanitize user input in the routers with express-validator.github.io -->
- [ ] The API endpoints are properly secured with keycloak
<!-- Use the `keycloak.protect(roleName)` express middleware in the routes -->

<!--
Optional for now, since tests are not working correctly
- [ ] Create tests for your changes
- [ ] Make sure the tests are passing
-->

If the UI has been modified:

- [ ] It is translated in both language (with no hard coded text) <!-- To sort the keys and remove unused keys in the translation files, run `yarn i18n:cleanup` -->
- [ ] Has been tested on IE
- [ ] The modifications are tab friendly
- [ ] It is accessible
