import React, { Component } from "react";
import PropTypes from "prop-types";

import NavigationBarView from "./navigationBarView";

/** Logic for the navigation bar used by the secured routes */
export default class NavigationBarController extends Component {
  static propTypes = {
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired,
    /** Whether should display search form or not */
    includeSearchForm: PropTypes.bool,
    /** The object representing the keycloak session */
    keycloak: PropTypes.object,
    /** Function to change route. NOTE: This is currently only used by the searchForm on /results route which could be moved out of the nav bar in future */
    redirectFunction: PropTypes.func
  };

  render() {
    const {
      changeLanguage,
      includeSearchForm,
      keycloak,
      redirectFunction
    } = this.props;

    const admin = sessionStorage.getItem("admin") === "true";

    return (
      <NavigationBarView
        admin={admin}
        changeLanguage={changeLanguage}
        includeSearchForm={includeSearchForm}
        keycloak={keycloak}
        redirectFunction={redirectFunction}
      />
    );
  }
}
