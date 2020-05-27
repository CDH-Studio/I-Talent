import React, { Component, typeButtonText, typeButtonURL } from "react";

import PropTypes from "prop-types";

import HomeLayoutView from "./homeLayoutView";
import Advanced from "../../pages/Advanced";

/**
 * Logic for the layout of the /home route
 */
class HomeLayoutController extends Component {
  static propTypes = {
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired,
    /** The object representing the keycloak session */
    keycloak: PropTypes.object,
    /** Function to change route */
    redirectFunction: PropTypes.func.isRequired,
    /** Whether should display advanced search form or not */
    showAdvancedFields: PropTypes.bool
  };

  constructor(props) {
    super(props);
    //to add a user into user table
    this.searchQuery = {};

    this.performSearch = this.performSearch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);

    this.state = {
      isEmpty: false
    };
  }

  updateSearch(e, { name, value }) {
    this.searchQuery[name] = value;
  }

  performSearch() {
    const { redirectFunction } = this.props;

    redirectFunction("/secured/results", { searchQuery: this.searchQuery });
  }

  setEmpty(isEmpty) {
    this.setState({ isEmpty: isEmpty });
  }

  render() {
    const {
      changeLanguage,
      keycloak,
      redirectFunction,
      showAdvancedFields
    } = this.props;

    return (
      <HomeLayoutView
        changeLanguage={changeLanguage}
        keycloak={keycloak}
        redirectFunction={redirectFunction}
        showAdvancedFields={showAdvancedFields}
        typeButtonText={typeButtonText}
        typeButtonURL={typeButtonURL}
        setEmpty={this.setEmpty.bind(this)}
        isEmpty={this.state.isEmpty}
      />
    );
  }
}

HomeLayoutController.defaultProps = {
  showAdvancedFields: false
};

export default HomeLayoutController;
