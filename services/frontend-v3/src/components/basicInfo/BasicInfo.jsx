import React from "react";
import {
  LinkedinOutlined,
  GithubOutlined,
  LinkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import BasicInfoView from "./BasicInfoView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const styles = {
  icon: {
    marginRight: 5,
  },
};

const BasicInfo = ({ data, connectionStatus, changeConnection }) => {
  const { locale } = useSelector((state) => state.settings);

  const getButtonLinks = () => {
    const { linkedin, github, gcconnex, email } = data;
    const buttonLinks = {
      email: {
        textId: "profile.email",
        url: `mailto:${email}`,
        icon: <MailOutlined style={styles.icon} />,
      },
    };

    if (linkedin) {
      buttonLinks.linkedin = {
        textId: "profile.linkedin",
        url: `https://linkedin.com/in/${linkedin}`,
        icon: <LinkedinOutlined style={styles.icon} />,
      };
    }

    if (github) {
      buttonLinks.github = {
        textId: "profile.github",
        url: `https://github.com/${github}`,
        icon: <GithubOutlined style={styles.icon} />,
      };
    }

    if (gcconnex) {
      buttonLinks.gcconnex = {
        textId: "profile.gcconnex",
        url: `https://gcconnex.gc.ca/profile/${gcconnex}`,
        icon: <LinkOutlined style={styles.icon} />,
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
      employmentInfo={
        data.employmentInfo &&
        (data.employmentInfo.find((i) => i.language === locale) ||
          data.employmentInfo[0])
      }
      buttonLinks={getButtonLinks()}
      connectionStatus={connectionStatus}
      changeConnection={changeConnection}
    />
  );
};

BasicInfo.propTypes = {
  data: ProfileInfoPropType.isRequired,
  connectionStatus: PropTypes.bool.isRequired,
  changeConnection: PropTypes.func.isRequired,
};

export default BasicInfo;
