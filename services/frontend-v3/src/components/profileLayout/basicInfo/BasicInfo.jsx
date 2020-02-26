import React, { Component } from "react";
import BasicInfoView from "./BasicInfoView";

class BasicInfo extends Component {
  render() {
    const { data } = this.props;

    const name = data.firstName + " " + data.lastName;

    return (
      <BasicInfoView
        data={data}
        avatar={{
          acr: getAcronym(name),
          color: stringToHslColor(getAcronym(name))
        }}
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

function stringToHslColor(str) {
  var hash = 0;
  var s = 90;
  var l = 45;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

function getAcronym(name) {
  const i = name.lastIndexOf(" ") + 1;
  return name.substring(0, 1) + name.substring(i, i + 1);
}

export default BasicInfo;
