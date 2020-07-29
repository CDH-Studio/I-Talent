import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import {
  Results,
  Profile,
  ProfileEdit,
  ProfileCreate,
  NotFound,
} from "../pages";
import AppLayout from "../components/layouts/appLayout/AppLayout";
import login from "../utils/login";
import useAxios from "../utils/axios-instance";

const Secured = ({ location }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userCompletedSignup, setUserCompletedSignup] = useState(false);
  const [keycloak] = useKeycloak();
  const axios = useAxios();

  const getInfo = useCallback(async () => {
    const signupStep = await login(keycloak, axios);
    setUserCompletedSignup(signupStep === 8);
    setAuthenticated(keycloak.authenticated);
  }, [axios, keycloak]);

  useEffect(() => {
    if (keycloak.authenticated) {
      getInfo();
    } else {
      keycloak.login();
    }
  }, [getInfo, keycloak]);

  if (!authenticated) {
    return <AppLayout loading />;
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
