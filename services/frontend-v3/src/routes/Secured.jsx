import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Keycloak from "keycloak-js";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import {
  Logout,
  Home,
  Results,
  Profile,
  ProfileEdit,
  ProfileCreate,
  NotFound,
} from "../pages";
import keycloakConfig from "../keycloak";
import { createUser } from "../functions/login";

const { keycloakJSONConfig } = keycloakConfig;

const Secured = ({ location }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const keycloakInstance = Keycloak(keycloakJSONConfig);

    // Check if profile exist for the logged in user
    const profileExist = () => {
      return keycloakInstance.loadUserInfo().then(async userInfo => {
        return createUser(userInfo.email, userInfo.name).then(res => {
          // Add name and email to local storage
          localStorage.setItem("name", userInfo.name);
          localStorage.setItem("email", userInfo.email);
          return res.hasProfile;
        });
      });
    };

    // Generate redirect if profile does not exist
    const renderRedirect = () => {
      return profileExist().then(exists => {
        if (!exists) {
          return (
            <Redirect from="/old-path" to="/secured/profile/create/step/1" />
          );
        }
        return <div />;
      });
    };

    keycloakInstance
      .init({
        onLoad: "login-required",
        promiseType: "native",
        checkLoginIframe: false,
      })
      .then(auth => {
        // check if user is admin
        if (
          keycloakInstance.tokenParsed.resource_access &&
          keycloakInstance.tokenParsed.resource_access["upskill-client"]
        ) {
          sessionStorage.setItem(
            "admin",
            keycloakInstance.tokenParsed.resource_access[
              "upskill-client"
            ].roles.includes("view-admin-console")
          );
        } else {
          sessionStorage.removeItem("admin");
        }

        axios.interceptors.request.use(config =>
          keycloakInstance.updateToken(5).then(() => {
            const newConfig = config;
            newConfig.headers.Authorization = `Bearer ${keycloakInstance.token}`;
            return Promise.resolve(newConfig).catch(keycloakInstance.login);
          })
        );

        setKeycloak(keycloakInstance);
        setAuthenticated(auth);
        // store user info in local storage and redirect to create profile if needed
        renderRedirect().then(redirectLink => {
          setRedirect(redirectLink);
        });
      });
  }, []);

  // Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // const copyToClipboard = e => {
  //   this.textArea.select();
  //   document.execCommand("copy");
  //   e.target.focus();
  // };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  /* detect if the user is on setup page to stop redirect if profile is not found */
  const currentPath = location.pathname;
  const regex = /(\/\bprofile\b\/\bcreate\b)/g;
  let redirectToSetup;
  if (!currentPath.match(regex)) {
    redirectToSetup = redirect;
  }

  if (keycloak) {
    if (authenticated) {
      return (
        <div id="view">
          {/* Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* <div>
              Keycloak Secret
              <form>
                <textarea
                  ref={textarea => (this.textArea = textarea)}
                  value={keycloak.token}
                  readOnly
                />
              </form>
              {document.queryCommandSupported("copy") && (
                <div>
                  <button onClick={this.copyToClipboard}>Copy</button>
                  {copySuccess}
                </div>
              )}
            </div> */}
          {/* Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

          {/* redirect to set up page  */}
          {redirectToSetup}
          <Switch>
            {/* home page with large search bar */}
            <Route
              exact
              path="/secured/home"
              render={({ history }) => (
                <Home keycloak={keycloak} history={history} />
              )}
            />
            {/* Results of search */}
            <Route
              exact
              path="/secured/results"
              render={({ history }) => (
                <Results keycloak={keycloak} history={history} />
              )}
            />
            {/* Create profile forms */}
            <Route
              path="/secured/profile/create/step/:step"
              render={({ match, history }) => (
                <ProfileCreate
                  keycloak={keycloak}
                  match={match}
                  history={history}
                />
              )}
            />
            {/* Edit profile forms */}
            <Route
              path="/secured/profile/edit/:step"
              render={({ match, history }) => (
                <ProfileEdit
                  keycloak={keycloak}
                  history={history}
                  match={match}
                />
              )}
            />
            {/* Profile page based on user ID */}
            <Route
              path="/secured/profile/:id?"
              render={({ history, match }) => (
                <Profile keycloak={keycloak} history={history} match={match} />
              )}
            />
            {/* Logout authorized user */}
            <Route
              exact
              path="/secured/logout"
              render={() => <Logout keycloak={keycloak} />}
            />
            {/* 404 Page */}
            <Route render={() => <NotFound />} />
          </Switch>
        </div>
      );
    }
    return <div>Unable to authenticate!</div>;
  }
  return <div />;
};

Secured.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

Secured.defaultProps = {
  location: {
    pathname: "",
  },
};

export default Secured;
