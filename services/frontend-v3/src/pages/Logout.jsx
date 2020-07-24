import React, { useEffect } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import Keycloak from "keycloak-js";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

const Logout = ({ keycloak }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "logging out...";
  }, []);

  try {
    dispatch(clearUser());
    keycloak.logout({ redirectUri: window.location.origin });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return <Redirect to="/secured/home" />;
  }

  return null;
};

Logout.propTypes = {
  keycloak: PropTypes.instanceOf(Keycloak).isRequired,
};

export default Logout;
