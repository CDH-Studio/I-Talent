import React from "react";
import { Redirect } from "react-router";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    document.title = "loggin out...";
  }

  // log out user and redirect home
  logout(keycloak) {
    try {
      keycloak.logout({ redirectUri: window.location.origin });
      localStorage.clear();
      return 1;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  render() {
    // Check if user logged out successfully
    if (!this.logout(this.props.keycloak)) {
      return <Redirect to="/secured/home" />;
    }
  }
}

export default Logout;
