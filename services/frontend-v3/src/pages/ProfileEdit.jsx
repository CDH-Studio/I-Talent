import React from "react";
import EditProfileLayout from "../components/layouts/editProfileLayout/EditProfileLayout";

class ProfileCreate extends React.Component {
  goto = (link) => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Create Profile | I-Talent";
  }

  render() {
    return (
      <EditProfileLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
        step={this.props.match.params.step}
      ></EditProfileLayout>
    );
  }
}

export default ProfileCreate;
