import React from "react";
import BasicInfoView from "./BasicInfoView";
import { ProfileInfoPropType } from "../../customPropTypes";

const BasicInfo = ({ data }) => {
  const getButtonLinks = () => {
    const { linkedin, github, gcconnex, email } = data;
    const buttonLinks = { buttons: [] };

    if (linkedin) {
      buttonLinks.buttons.push("linkedin");
      buttonLinks.linkedin = {
        icon: "linkedin",
        textId: "profile.linkedin",
        url: linkedin,
      };
    }

    if (github) {
      buttonLinks.buttons.push("github");
      buttonLinks.github = {
        icon: "github",
        textId: "profile.github",
        url: github,
      };
    }

    if (gcconnex) {
      buttonLinks.buttons.push("gcconnex");
      buttonLinks.gcconnex = {
        icon: "link",
        textId: "profile.gcconnex",
        url: gcconnex,
      };
    }

    buttonLinks.buttons.push("email");
    buttonLinks.email = {
      icon: "mail",
      textId: "profile.email",
      url: `mailto:${email}`,
    };

    return buttonLinks;
  };

  const name = `${data.firstName} ${data.lastName}`;

  return (
    <BasicInfoView
      data={data}
      name={name}
      avatar={{
        acr: data.nameInitials,
        color: data.avatarColor,
      }}
      jobTitle={data.jobTitle}
      buttonLinks={getButtonLinks()}
    />
  );
};

BasicInfo.propTypes = {
  data: ProfileInfoPropType.isRequired,
};

export default BasicInfo;
