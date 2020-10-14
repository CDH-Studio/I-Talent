import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useSelector } from "react-redux";
import {
  Results,
  Profile,
  ProfileEdit,
  ProfileCreate,
  NotFound,
  Stats,
  Settings,
} from "../pages";
import AppLayout from "../components/layouts/appLayout/AppLayout";
import login from "../utils/login";
import useAxios from "../utils/axios-instance";

const Secured = ({ location }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const { keycloak } = useKeycloak();
  const axios = useAxios();

  const { signupStep } = useSelector((state) => state.user);

  const getInfo = useCallback(async () => {
    await login(keycloak, axios);
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
    signupStep !== 8
  ) {
    return <Redirect to={`/profile/create/step/${signupStep}`} />;
  }

  return (
    <>
      <Switch>
        <Route exact path="/results" render={() => <Results />} />
        <Route exact path="/statistics" render={() => <Stats />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route
          path="/profile/create/step/:step"
          render={({ match }) => {
            const { step } = match.params;

            if (
              !Number.isNaN(step) &&
              parseInt(step, 10) > 0 &&
              parseInt(step, 10) < 9
            ) {
              if (parseInt(step, 10) !== 8 && signupStep === 8) {
                return <Redirect to="/profile/edit/primary-info" />;
              }

              return <ProfileCreate match={match} />;
            }

            if (signupStep === 8) {
              return <Redirect to="/profile/edit/primary-info" />;
            }

            return <Redirect to={`/profile/create/step/${signupStep}`} />;
          }}
        />
        <Route
          path="/profile/edit/:step"
          render={({ match }) => <ProfileEdit match={match} />}
        />
        <Route
          path="/profile/edit/"
          render={() => <Redirect to="/profile/edit/primary-info" />}
        />
        <Route
          path="/profile/create"
          render={() => {
            if (signupStep === 8) {
              return <Redirect to="/profile/edit/primary-info" />;
            }

            return <Redirect to={`/profile/create/step/${signupStep}`} />;
          }}
        />
        <Route
          path="/profile/:id?"
          render={({ match, history }) => (
            <Profile match={match} history={history} />
          )}
        />
        <Route
          path="/results"
          render={({ location: { search } }) => (
            <Redirect to={{ search, pathname: "/results" }} />
          )}
        />
        <Route
          path="/statistics"
          render={() => <Redirect to="/statistics" />}
        />
        <Route path="/settings" render={() => <Redirect to="/settings" />} />
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
