import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Keycloak from "keycloak-js";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import * as Sentry from "@sentry/browser";
import { useDispatch } from "react-redux";
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
import {
  setUserName,
  setUserEmail,
  setUserId,
  setUserAvatarColor,
  setUserInitials,
} from "../redux/slices/userSlice";
import config from "../config";

const { keycloakJSONConfig } = keycloakConfig;
const { backendAddress } = config;

const Secured = ({ location }) => {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const handleRequest = (userInfo, res) => {
    dispatch(setUserName(userInfo.name));
    dispatch(setUserEmail(userInfo.email));
    dispatch(setUserId(res.data.id));
    dispatch(setUserAvatarColor(res.data.avatarColor));
    dispatch(setUserInitials(res.data.nameInitials));
    return res.data.signupStep;
  };

  useEffect(() => {
    const keycloakInstance = Keycloak(keycloakJSONConfig);

    // Check if profile exist for the logged in user
    const profileExist = () => {
      return keycloakInstance.loadUserInfo().then(async (userInfo) => {
        return axios
          .get(`${backendAddress}api/user/${userInfo.sub}`)
          .then((res) => {
            handleRequest(userInfo, res);
          })
          .catch(() => {
            axios
              .post(`${backendAddress}api/user/${userInfo.sub}`, {
                email: userInfo.email,
                name: userInfo.name,
                lastName: userInfo.family_name,
                firstName: userInfo.given_name,
              })
              .then((res) => {
                handleRequest(userInfo, res);
              });
          });
      });
    };

    // Generate redirect if profile does not exist
    const renderRedirect = () => {
      return profileExist().then((signupStep) => {
        if (signupStep === 8) {
          return null;
        }

        return (
          <Redirect from="/old-path" to="/secured/profile/create/step/1" />
        );
      });
    };

    keycloakInstance
      .init({
        onLoad: "login-required",
        promiseType: "native",
        checkLoginIframe: false,
      })
      .then((auth) => {
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

        axios.interceptors.request.use((config) =>
          keycloakInstance.updateToken(5).then(() => {
            const newConfig = config;
            newConfig.headers.Authorization = `Bearer ${keycloakInstance.token}`;
            return Promise.resolve(newConfig).catch(keycloakInstance.login);
          })
        );

        if (keycloakInstance && keycloakInstance.userInfo) {
          Sentry.configureScope((scope) => {
            scope.setUser({
              username: keycloakInstance.userInfo.preferred_username,
              email: keycloakInstance.userInfo.email,
            });
          });
        }

        setKeycloak(keycloakInstance);
        setAuthenticated(auth);
        // store user info in local storage and redirect to create profile if needed
        renderRedirect().then((redirectLink) => {
          setRedirect(redirectLink);
        });
      });
  }, [dispatch]);

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
              render={() => <Home keycloak={keycloak} />}
            />
            {/* Results of search */}
            <Route
              exact
              path="/secured/results"
              render={() => <Results keycloak={keycloak} />}
            />
            {/* Create profile forms */}
            <Route
              path="/secured/profile/create/step/:step"
              render={({ match }) => (
                <ProfileCreate keycloak={keycloak} match={match} />
              )}
            />
            {/* Edit profile forms */}
            <Route
              path="/secured/profile/edit/:step"
              render={({ match }) => (
                <ProfileEdit keycloak={keycloak} match={match} />
              )}
            />
            {/* Profile page based on user ID */}
            <Route
              path="/secured/profile/:id?"
              render={({ match }) => (
                <Profile keycloak={keycloak} match={match} />
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
