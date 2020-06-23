import React from "react";
import BasicInfoView from "./BasicInfoView";
import { ProfileInfoPropType } from "../../customPropTypes";

const BasicInfo = ({ data }) => {
  const getButtonLinks = () => {
    const { linkedinUrl, githubUrl, gcconnexUrl, email } = data;
    const buttonLinks = { buttons: [] };

    if (linkedinUrl) {
      buttonLinks.buttons.push("linkedin");
      buttonLinks.linkedin = {
        icon: "linkedin",
        textId: "profile.linkedin",
        url: linkedinUrl,
      };
    }

    if (githubUrl) {
      buttonLinks.buttons.push("github");
      buttonLinks.github = {
        icon: "github",
        textId: "profile.github",
        url: githubUrl,
      };
    }

    if (gcconnexUrl) {
      buttonLinks.buttons.push("gcconnex");
      buttonLinks.gcconnex = {
        icon: "link",
        textId: "profile.gcconnex",
        url: gcconnexUrl,
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
