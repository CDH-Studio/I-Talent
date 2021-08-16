import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useKeycloak } from "@react-keycloak/web";
import PropTypes from "prop-types";

import AppLayout from "../components/layouts/appLayout/AppLayout";
import LandingLayout from "../components/layouts/landingLayout/LandingLayout";
import { clearUser } from "../redux/slices/userSlice";
import login from "../utils/login";
import useAxios from "../utils/useAxios";
import Home from "./Home";

/** UI for the landing route layout */
const LandingPage = ({ location }) => {
  const { keycloak } = useKeycloak();
  const [savedLoginInfo, setSavedLoginInfo] = useState(false);
  const axios = useAxios();
  const dispatch = useDispatch();

  const { signupStep } = useSelector((state) => state.user);

  useEffect(() => {
    const setLoginInfo = async () => {
      await login(keycloak, axios);
      setSavedLoginInfo(true);
    };
    if (keycloak.authenticated) {
      setLoginInfo();
    } else {
      document.title = "I-Talent";
      dispatch(clearUser());
    }
  }, [keycloak.authenticated, dispatch, keycloak, axios]);

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
