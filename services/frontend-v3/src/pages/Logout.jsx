import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import Keycloak from "keycloak-js";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

const Logout = ({ keycloak }) => {
  const dispatch = useDispatch();
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    document.title = "logging out...";

    try {
      dispatch(clearUser());
      keycloak.logout({ redirectUri: window.location.origin });
      setLoggedOut(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [dispatch, keycloak]);

  if (loggedOut) {
    return <Redirect to="/secured/home" />;
  }

  return null;
};

Logout.propTypes = {
  keycloak: PropTypes.instanceOf(Keycloak).isRequired,
};

export default Logout;
