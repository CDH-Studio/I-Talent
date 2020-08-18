import React, { useEffect, useState, useCallback } from "react";
import { useKeycloak } from "@react-keycloak/razzle";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import LandingLayout from "../components/layouts/landingLayout/LandingLayout";
import Home from "./Home";
import AppLayout from "../components/layouts/appLayout/AppLayout";
import login from "../utils/login";
import useAxios from "../utils/axios-instance";
import { clearUser } from "../redux/slices/userSlice";

/** UI for the landing route layout */
const LandingPage = ({ location }) => {
  const [keycloak] = useKeycloak();
  const [savedLoginInfo, setSavedLoginInfo] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const axios = useAxios();
  const dispatch = useDispatch();

  const setLoginInfo = useCallback(async () => {
    setSignupStep(await login(keycloak, axios));
    setSavedLoginInfo(true);
  }, [keycloak, axios]);

  useEffect(() => {
    if (keycloak.authenticated) {
      setLoginInfo();
    } else {
      document.title = "I-Talent";
      dispatch(clearUser());
    }
  }, [keycloak.authenticated, setLoginInfo, dispatch]);

  if (keycloak.authenticated) {
    if (savedLoginInfo) {
      if (
        !location.pathname.includes("/profile/create") &&
        !location.pathname.includes("/logout") &&
        signupStep !== 8
      ) {
        return <Redirect to={`/profile/create/step/${signupStep}`} />;
      }

      return <Home />;
    }
    return <AppLayout loading />;
  }

  return <LandingLayout />;
};

LandingPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

LandingPage.defaultProps = {
  location: {
    pathname: "",
  },
};

export default LandingPage;
