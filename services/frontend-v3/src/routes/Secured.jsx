import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import useAxios from "../utils/axios-instance";
import {
  Logout,
  Home,
  Results,
  Profile,
  ProfileEdit,
  ProfileCreate,
} from "../pages";
import { setUser, setUserIsAdmin } from "../redux/slices/userSlice";
import { setLocale } from "../redux/slices/settingsSlice";

const Secured = ({ location }) => {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [userCompletedSignup, setUserCompletedSignup] = useState(false);
  const axios = useAxios();
  const [keycloak] = useKeycloak();

  const createUser = async (userInfo) =>
    axios.post(`api/user/${userInfo.sub}`, {
      email: userInfo.email,
      name: userInfo.name,
      lastName: userInfo.family_name,
      firstName: userInfo.given_name,
    });

  const profileExist = useCallback(
    async (userInfo) => {
      let response;
      try {
        response = await axios.get(`api/user/${userInfo.sub}`);

        if (response.data === null) {
          response = await createUser(userInfo);
        }
      } catch (error) {
        response = await createUser(userInfo);
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
    const getInfo = async () => {
      dispatch(setUserIsAdmin(keycloak.hasResourceRole("view-admin-console")));
      const keycloakUserInfo = await keycloak.loadUserInfo();
      const signupStep = await profileExist(keycloakUserInfo);
      setUserCompletedSignup(signupStep === 8);
      setAuthenticated(keycloak.authenticated);
    };
    if (keycloak) {
      if (keycloak.authenticated) {
        getInfo();
      } else {
        keycloak.login();
      }
    }
  }, [dispatch, keycloak, profileExist]);

  if (!authenticated) {
    return <div>Unable to authenticate!</div>;
  }

  if (
    !location.pathname.includes("/profile/create") &&
    !location.pathname.includes("/logout") &&
    !userCompletedSignup
  ) {
    return <Redirect to="/profile/create/step/1" />;
  }

  return (
    <>
      <Switch>
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/results" render={() => <Results />} />
        <Route
          path="/profile/create/step/:step"
          render={({ match }) => <ProfileCreate match={match} />}
        />
        <Route
          path="/profile/edit/:step"
          render={({ match }) => <ProfileEdit match={match} />}
        />
        <Route
          path="/profile/:id?"
          render={({ match, history }) => (
            <Profile match={match} history={history} />
          )}
        />
        <Route
          exact
          path="/logout"
          render={() => <Logout keycloak={keycloak} />}
        />
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
