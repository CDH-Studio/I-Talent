import { useMemo } from "react";
import {
  GithubOutlined,
  LinkedinOutlined,
  LinkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import BasicInfoCardView from "./BasicInfoCardView";

/**
 * Format data for team and project names
 * @param {Object} externalLinks - links to external profiles
 * @param {string} externalLinks.email - email
 * @param {string} externalLinks.gcconnex - gcconnex username
 * @param {string} externalLinks.github - github username
 * @param {string} externalLinks.linkedin - linkedin username
 * @return {Object} formatted list of team names
 */
const generateButtonLinks = ({ email, gcconnex, github, linkedin }) => {
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

/**
 * Format data for team and project names
 * @param {string[]} teamData - array of team names
 * @return {Array<{key: string, label: string}>} formatted list of team names
 */
const formatTeamsData = (teamData) =>
  teamData &&
  teamData.map((team) => ({
    key: team,
    label: team,
  }));

const BasicInfoCard = ({ data, connectionStatus }) => {
  const name = `${data.firstName} ${data.lastName}`;
  const buttonLinks = useMemo(
    () =>
      generateButtonLinks({
        email: data.email,
        gcconnex: data.gcconnex,
        github: data.github,
        linkedin: data.linkedin,
      }),
    [data.linkedin, data.github, data.gcconnex, data.email]
  );
  const formattedTeamsData = useMemo(
    () => formatTeamsData(data.teams),
    [data.teams]
  );

  return (
    <BasicInfoCardView
      avatar={{
        acr: data.nameInitials,
        color: data.avatarColor,
      }}
      buttonLinks={buttonLinks}
      connectionStatus={connectionStatus}
      data={data}
      jobTitle={data.jobTitle}
      name={name}
      teamsAndProjects={formattedTeamsData}
    />
  );
};

BasicInfoCard.propTypes = {
  connectionStatus: PropTypes.bool.isRequired,
  data: ProfileInfoPropType.isRequired,
};

export default BasicInfoCard;
