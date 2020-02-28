import React from "react";
import { Redirect } from "react-router";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Loggin out...";
  }

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
    console.log(this.props.keycloak);
    if (!this.logout(this.props.keycloak)) {
      return <Redirect to="/secured/home" />;
    }
  }
}

export default Profile;
