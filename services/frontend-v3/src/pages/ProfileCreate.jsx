import React from "react";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";

class ProfileCreate extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Create Profile | UpSkill";
  }

  render() {
    return (
      <CreateProfileLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
        step={this.props.match.params.step}
      ></CreateProfileLayout>
    );
  }
}

export default ProfileCreate;
