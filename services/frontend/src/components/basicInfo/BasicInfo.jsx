import {
  GithubOutlined,
  LinkedinOutlined,
  LinkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import BasicInfoView from "./BasicInfoView";

const BasicInfo = ({ data, connectionStatus, changeConnection }) => {
  const getButtonLinks = () => {
    const { linkedin, github, gcconnex, email } = data;

    const buttonLinks = {
      email: {
        icon: <MailOutlined className="mr-1" />,
        textId: "email",
        url: `mailto:${email}`,
      },
    };

    if (linkedin) {
      buttonLinks.linkedin = {
        icon: <LinkedinOutlined className="mr-1" />,
        textId: "linkedin",
        url: `https://linkedin.com/in/${linkedin}`,
      };
    }

    if (github) {
      buttonLinks.github = {
        icon: <GithubOutlined className="mr-1" />,
        textId: "github",
        url: `https://github.com/${github}`,
      };
    }

    if (gcconnex) {
      buttonLinks.gcconnex = {
        icon: <LinkOutlined className="mr-1" />,
        textId: "gcconnex",
        url: `https://gcconnex.gc.ca/profile/${gcconnex}`,
      };
    }

    return buttonLinks;
  };

  const name = `${data.firstName} ${data.lastName}`;

  return (
    <BasicInfoView
      avatar={{
        acr: data.nameInitials,
        color: data.avatarColor,
      }}
      buttonLinks={getButtonLinks()}
      changeConnection={changeConnection}
      connectionStatus={connectionStatus}
      data={data}
      jobTitle={data.jobTitle}
      name={name}
    />
  );
};

BasicInfo.propTypes = {
  changeConnection: PropTypes.func.isRequired,
  connectionStatus: PropTypes.bool.isRequired,
  data: ProfileInfoPropType.isRequired,
};

export default BasicInfo;
