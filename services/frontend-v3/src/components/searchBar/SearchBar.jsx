import React from "react";

import {} from "antd";

import SearchBarView from "./SearchBarView";

class SearchBar extends React.Component {
  render() {
    return (
      <SearchBarView>
        changeLanguage=
        {this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
      </SearchBarView>
    );
  }
}
export default SearchBar;
