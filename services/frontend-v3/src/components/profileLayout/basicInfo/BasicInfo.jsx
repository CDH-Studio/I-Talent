import React, { Component } from "react";
import BasicInfoView from "./BasicInfoView";

class BasicInfo extends Component {
  render() {
    const { data } = this.props;

    return (
      <BasicInfoView
        data={data}
        locale={localStorage.getItem("lang")}
        buttonLinks={this.getButtonLinks()}
      />
    );
  }

  getButtonLinks() {
    const { linkedinUrl, githubUrl, twitterUrl, email } = this.props.data;
    let buttonLinks = { buttons: [] };

    if (linkedinUrl) {
      buttonLinks.buttons.push("linkedin");
      buttonLinks.linkedin = {
        icon: "linkedin",
        textId: "profile.linkedin",
        url: linkedinUrl
      };
    }

    if (githubUrl) {
      buttonLinks.buttons.push("github");
      buttonLinks.github = {
        icon: "github",
        textId: "profile.github",
        url: githubUrl
      };
    }

    if (twitterUrl) {
      buttonLinks.buttons.push("gcconnex");
      buttonLinks.gcconnex = {
        icon: "link",
        textId: "profile.gcconnex",
        url: twitterUrl
      };
    }

    buttonLinks.buttons.push("email");
    buttonLinks.email = {
      icon: "mail",
      textId: "profile.email",
      url: "mailto:" + email
    };

    return buttonLinks;
  }
}

export default BasicInfo;
