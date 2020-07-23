import React from "react";
import { useHistory } from "react-router";
import {
  LinkedinOutlined,
  GithubOutlined,
  LinkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import BasicInfoView from "./BasicInfoView";
import { ProfileInfoPropType } from "../../customPropTypes";

const BasicInfo = ({ data }) => {
  const history = useHistory();

  const getButtonLinks = () => {
    const { linkedin, github, gcconnex, email } = data;
    const buttonLinks = {
      email: {
        textId: "profile.email",
        url: `mailto:${email}`,
        icon: <MailOutlined style={{ marginRight: 5 }} />,
      },
    };

    if (linkedin) {
      buttonLinks.linkedin = {
        textId: "profile.linkedin",
        url: `https://linkedin.com/in/${linkedin}`,
        icon: <LinkedinOutlined style={{ marginRight: 5 }} />,
      };
    }

    if (github) {
      buttonLinks.github = {
        textId: "profile.github",
        url: `https://github.com/${github}`,
        icon: <GithubOutlined style={{ marginRight: 5 }} />,
      };
    }

    if (gcconnex) {
      buttonLinks.gcconnex = {
        textId: "profile.gcconnex",
        url: `https://gcconnex.gc.ca/profile/${gcconnex}`,
        icon: <LinkOutlined style={{ marginRight: 5 }} />,
      };
    }

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
      history={history}
    />
  );
};

BasicInfo.propTypes = {
  data: ProfileInfoPropType.isRequired,
};

export default BasicInfo;
