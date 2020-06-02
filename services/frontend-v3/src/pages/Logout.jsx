import React, { useEffect } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import Keycloak from "keycloak-js";
import store from "../redux";
import { clearUser } from "../redux/slices/userSlice";

const Logout = ({ keycloak }) => {
  useEffect(() => {
    document.title = "logging out...";
  }, []);

  // log out user and redirect home
  const logout = () => {
    try {
      keycloak.logout({ redirectUri: window.location.origin });
      store.dispatch(clearUser());
      return 1;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return 0;
    }
  };

  // Check if user logged out successfully
  if (!logout()) {
    return <Redirect to="/secured/home" />;
  }

  return null;
};

Logout.propTypes = {
  keycloak: PropTypes.instanceOf(Keycloak).isRequired,
};

export default Logout;
