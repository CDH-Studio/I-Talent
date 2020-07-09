import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Keycloak from "keycloak-js";
import { Route, Redirect, Switch } from "react-router-dom";
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
import { setUser } from "../redux/slices/userSlice";
import { setLocale } from "../redux/slices/settingsSlice";

const { keycloakJSONConfig } = keycloakConfig;

const Secured = ({ location }) => {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  const [userCompletedSignup, setUserCompletedSignup] = useState(false);

  // Check if profile exist for the logged in user and saves the data of the request into redux
  const profileExist = useCallback(
    async (userInfo) => {
      let response;
      try {
        response = await axios.get(`api/user/${userInfo.sub}`);
      } catch (error) {
        response = await axios.post(`api/user/${userInfo.sub}`, {
          email: userInfo.email,
          name: userInfo.name,
          lastName: userInfo.family_name,
          firstName: userInfo.given_name,
        });
      }

      dispatch(
        setUser({
          id: response.data.id,
          avatarColor: response.data.avatarColor,
          initials: response.data.nameInitials,
          name: userInfo.name,
          email: userInfo.email,
        })
      );

      dispatch(
        setLocale(
          response.data.preferredLanguage
            ? response.data.preferredLanguage
            : "ENGLISH"
        )
      );

      return response.data.signupStep;
    },
    [dispatch]
  );

  useEffect(() => {
    const keycloakInstance = Keycloak(keycloakJSONConfig);

    keycloakInstance
      .init({
        onLoad: "login-required",
        promiseType: "native",
        checkLoginIframe: false,
      })
      .then(async (auth) => {
        // Checks if the user has the correct keycloak role (is admin)
        const resources = keycloakInstance.tokenParsed.resource_access;
        if (resources) {
          const hasAdminAccess = Object.keys(resources).every((resourceKey) => {
            const resource = resources[resourceKey];

            return (
              "role" in resource &&
              Array.isArray(resource.role) &&
              resource.role.includes("view-admin-console")
            );
          });

          if (hasAdminAccess) {
            sessionStorage.setItem("admin", true);
          } else {
            sessionStorage.removeItem("admin");
          }
        }

        axios.interceptors.request.use((axiosConfig) =>
          keycloakInstance.updateToken(5).then(() => {
            const newConfig = axiosConfig;
            newConfig.headers.Authorization = `Bearer ${keycloakInstance.token}`;
            return Promise.resolve(newConfig).catch(keycloakInstance.login);
          })
        );

        const signupStep = await profileExist(keycloakInstance.loadUserInfo());
        setUserCompletedSignup(signupStep === 8);

        setKeycloak(keycloakInstance);
        setAuthenticated(auth);
      });
  }, [profileExist]);

  if (!keycloak) {
    return null;
  }

  if (!authenticated) {
    return <div>Unable to authenticate!</div>;
  }

  // If user didn't finish the creation of his profile and is not, redirect him to finish it
  if (
    !location.pathname.includes("/secured/profile/create") &&
    !location.pathname.includes("/secured/logout") &&
    !userCompletedSignup
  ) {
    return <Redirect to="/secured/profile/create/step/1" />;
  }

  return (
    <>
      <Switch>
        <Route exact path="/secured/home" render={<Home />} />
        <Route exact path="/secured/results" render={<Results />} />
        <Route
          path="/secured/profile/create/step/:step"
          render={({ match }) => <ProfileCreate match={match} />}
        />
        <Route
          path="/secured/profile/edit/:step"
          render={({ match }) => <ProfileEdit match={match} />}
        />
        <Route
          path="/secured/profile/:id?"
          render={({ match, history }) => (
            <Profile match={match} history={history} />
          )}
        />
        <Route
          exact
          path="/secured/logout"
          render={<Logout keycloak={keycloak} />}
        />
        <Route render={() => <NotFound />} />
      </Switch>
    </>
  );
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
