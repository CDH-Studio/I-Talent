import React from "react";
import { Typography, Steps } from "antd";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";

class ProfileCreate extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Create Profile | UpSkill";

    this.state = {
      current: 0
    };
  }

  onChange = current => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  render() {
    // const { current } = this.state;
    // let form = this.profileFormSelect(1);
    //let stepz = this.props.match.params.step;
    //console.log(stepz);

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

//Needed when using this,props.intl
export default ProfileCreate;
