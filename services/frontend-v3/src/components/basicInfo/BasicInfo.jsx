import React from "react";
import BasicInfoView from "./BasicInfoView";

function BasicInfo(props) {
  const getButtonLinks = () => {
    const linkedinUrl = props.data.linkedinUrl;
    const githubUrl = props.data.githubUrl;
    const gcconnexUrl = props.data.gcconnexUrl;
    const email = props.data.email;
    let buttonLinks = { buttons: [] };

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
      url: "mailto:" + email,
    };

    return buttonLinks;
  };

  const name = props.data.firstName + " " + props.data.lastName;

  return (
    <BasicInfoView
      data={props.data}
      name={name}
      avatar={{
        acr: props.data.nameInitials,
        color: props.data.avatarColor,
      }}
      jobTitle={props.data.jobTitle[localStorage.getItem("lang") || "en"]}
      locale={localStorage.getItem("lang") || "en"}
      buttonLinks={getButtonLinks()}
    />
  );
}

export default BasicInfo;
