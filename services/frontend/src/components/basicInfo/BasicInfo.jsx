import {
  LinkedinOutlined,
  GithubOutlined,
  LinkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import BasicInfoView from "./BasicInfoView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const BasicInfo = ({ data, connectionStatus, changeConnection }) => {
  const getButtonLinks = () => {
    const { linkedin, github, gcconnex, email } = data;

    const buttonLinks = {
      email: {
        textId: "email",
        url: `mailto:${email}`,
        icon: <MailOutlined className="mr-1" />,
      },
    };

    if (linkedin) {
      buttonLinks.linkedin = {
        textId: "linkedin",
        url: `https://linkedin.com/in/${linkedin}`,
        icon: <LinkedinOutlined className="mr-1" />,
      };
    }

    if (github) {
      buttonLinks.github = {
        textId: "github",
        url: `https://github.com/${github}`,
        icon: <GithubOutlined className="mr-1" />,
      };
    }

    if (gcconnex) {
      buttonLinks.gcconnex = {
        textId: "gcconnex",
        url: `https://gcconnex.gc.ca/profile/${gcconnex}`,
        icon: <LinkOutlined className="mr-1" />,
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
  data: ProfileInfoPropType.isRequired,
  connectionStatus: PropTypes.bool.isRequired,
  changeConnection: PropTypes.func.isRequired,
};

export default BasicInfo;
