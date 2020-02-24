import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import queryString from "query-string";
import {} from "antd";

import SearchBarView from "./SearchBarView";

export default class SearchBar extends React.Component {
  render() {
    const { name, data, avatar, locale } = this.props;
    return (
      <SearchBarView>
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
      </SearchBarView>
    );
  }
}
// const backendLink =
//   "http://upskill-backend-upskill.apps.dev.openshift.ised-isde.canada.ca/";
// function fieldNamesToArray() {
//   const fieldNames = async () => {
//     const response = await fetch(backendLink + "api/option/");
//   };
// }
