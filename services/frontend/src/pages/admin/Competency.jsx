import React, { Component } from "react";
import AdminOptionEdit from "../../components/admin/AdminOptionEdit";

class AdminCompetency extends Component {
  goto = (link, state) => this.props.history.push(link, state);

  render() {
    const { changeLanguage, keycloak } = this.props;

    return (
      <AdminOptionEdit
        type="competency"
        goto={this.goto}
        changeLanguage={changeLanguage}
        keycloak={keycloak}
        generateTable={this.generateTable}
      />
    );
  }
}

export default AdminCompetency;
