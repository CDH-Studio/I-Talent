import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Keycloak from "keycloak-js";
import { Route, Redirect, Switch } from "react-router-dom";
import * as Sentry from "@sentry/browser";
import { useDispatch } from "react-redux";
import axios from "../axios-instance";
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
import { setLocale } from "../redux/slices/settingsSlice";

const { keycloakJSONConfig } = keycloakConfig;

const Secured = ({ location }) => {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const handleRequest = useCallback(
    (userInfo, res) => {
      dispatch(setUserName(userInfo.name));
      dispatch(setUserEmail(userInfo.email));
      dispatch(setUserId(res.data.id));
      dispatch(setUserAvatarColor(res.data.avatarColor));
      dispatch(setUserInitials(res.data.nameInitials));
      dispatch(
        setLocale(
          res.data.preferredLanguage ? res.data.preferredLanguage : "ENGLISH"
        )
      );
      return res.data.signupStep;
    },
    [dispatch]
  );

  useEffect(() => {
    const keycloakInstance = Keycloak(keycloakJSONConfig);

    // Check if profile exist for the logged in user
    const profileExist = async () => {
      const userInfo = await keycloakInstance.loadUserInfo();

      try {
        const res = await axios.get(`api/user/${userInfo.sub}`);
        return handleRequest(userInfo, res);
      } catch (error) {
        const res = await axios.post(`api/user/${userInfo.sub}`, {
          email: userInfo.email,
          name: userInfo.name,
          lastName: userInfo.family_name,
          firstName: userInfo.given_name,
        });

        return handleRequest(userInfo, res);
      }
    };

    // Generate redirect if profile does not exist
    const renderRedirect = async () => {
      const signupStep = await profileExist();

      if (signupStep === 8) {
        return null;
      }

      return <Redirect to="/secured/profile/create/step/1" />;
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

        axios.interceptors.request.use((axiosConfig) =>
          keycloakInstance.updateToken(5).then(() => {
            const newConfig = axiosConfig;
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

        // store user info in local storage and redirect to create profile if needed
        renderRedirect().then((redirectLink) => {
          setRedirect(redirectLink);
          setKeycloak(keycloakInstance);
          setAuthenticated(auth);
        });
      });
  }, [dispatch, handleRequest]);

  /* detect if the user is on setup page to stop redirect if profile is not found */
  let redirectToSetup;
  if (
    !location.pathname.includes("/secured/profile/create") &&
    !location.pathname.includes("/secured/logout")
  ) {
    redirectToSetup = redirect;
  }

  if (keycloak) {
    if (authenticated) {
      if (redirectToSetup) {
        return redirectToSetup;
      }

      return (
        <div id="view">
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
              render={({ match, history }) => (
                <Profile keycloak={keycloak} match={match} history={history} />
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
  return null;
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
