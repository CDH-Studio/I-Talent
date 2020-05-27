import React, { Component } from "react";
import { injectIntl } from "react-intl";
import axios from "axios";
import config from "../config";
import ProfileLayoutController from "../components/profileLayout/profileLayoutController";

const backendAddress = config.backendAddress;
/** Page rendered on the /profile route */
class Profile extends Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);
    this.state = { profileInfo: undefined, visibleProfileCards: undefined };

    this.handleSuccess = response => {
      const convertDropdownOptions = list => {
        if (!this.ownProfile) {
          return list;
        }
        let newList = [];
        list.forEach(element => {
          newList.push({
            key: element.id,
            text: element.description,
            value: element.id
          });
        });
        return newList;
      };
      let profileInfo = response.data;
      profileInfo.skills = convertDropdownOptions(profileInfo.skills);
      profileInfo.competencies = convertDropdownOptions(
        profileInfo.competencies
      );
      profileInfo.developmentalGoals = convertDropdownOptions(
        profileInfo.developmentalGoals
      );

      this.setState({
        profileInfo: profileInfo,
        visibleProfileCards: profileInfo.visibleCards
      });
    };

    const url = window.location.toString();

    const profileIdStartIndex = url.indexOf("/secured/profile") + 17;

    if (url.length < profileIdStartIndex + 2) {
      this.profileId = localStorage.getItem("userId");
    } else {
      this.profileId = url.substring(profileIdStartIndex);
    }
    this.ownProfile = this.profileId === localStorage.getItem("userId");

    this.updateProfileInfo = () => {
      axios
        .get(
          //"http://localhost:8080/api/profile/6becd47a-ffe5-11e9-8d71-362b9e155667"
          //"http://localhost:8080/api/profile/faba08aa-ffe3-11e9-8d71-362b9e155667"
          //"http://localhost:8080/api/profile/6becd47a-ffe5-11e9-8d71-362b9e155667"
          backendAddress +
            (this.ownProfile ? "api/private/profile/" : "api/profile/") +
            this.profileId
        )
        .then(this.handleSuccess)
        .catch(function(error) {
          // handle error
          console.error(error);
        })
        .finally(function() {
          // always executed
        });
    };
    this.updateProfileInfo = this.updateProfileInfo.bind(this);
  }

  componentDidMount() {
    this.updateProfileInfo();
  }

  render() {
    const { changeLanguage, keycloak } = this.props;

    return (
      <ProfileLayoutController
        changeLanguage={changeLanguage}
        keycloak={keycloak}
        editable={this.ownProfile}
        privateView={this.ownProfile}
        visibleProfileCards={this.state.visibleProfileCards}
        profileInfo={this.state.profileInfo}
        updateProfileInfo={this.updateProfileInfo}
        redirectFunction={this.goto}
      />
    );
  }
}

export default injectIntl(Profile);
