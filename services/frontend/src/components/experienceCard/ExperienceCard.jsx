import { useMemo } from "react";
import { useIntl } from "react-intl";
import { FileDoneOutlined, LinkOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import ExperienceCardView from "./ExperienceCardView";

/**
 * Generate the formatted duration
 * @param {string} startDate - start date
 * @param {string} endDate - end date
 * @param {boolean} ongoingDate - is experience on going
 * @returns {string} - formatted duration
 */
const getExperienceDuration = (startDate, endDate, ongoingDate, intl) => {
  const formattedStartDate = dayjs(startDate).format("MMMM YYYY");
  const formattedEndDate = dayjs(endDate).format("MMMM YYYY");

  if (startDate && endDate) {
    return `${formattedStartDate} - ${formattedEndDate}`;
  }

  if (ongoingDate && startDate) {
    return `${formattedStartDate} - ${intl.formatMessage({
      id: "date.present",
    })}`;
  }

  if (ongoingDate) {
    return intl.formatMessage({
      id: "experience.date.present",
    });
  }

  if (startDate && !endDate) {
    return formattedStartDate;
  }

  if (!startDate && endDate) {
    return formattedEndDate;
  }

  return "-";
};

/**
 * Format the attachment links array
 * @param {object[]} attachmentLinks - start date
 * @param {string} attachmentLinks[].href - link to attachment
 * @param {string} attachmentLinks[].id - unique id of attachment
 * @param {string} attachmentLinks[].name.name - name of the attachment type
 * @returns {string} - formatted duration
 */
const formatAttachmentLinks = (attachmentLinks) =>
  attachmentLinks
    ? attachmentLinks.map((a) => ({
        href: a.url,
        icon: <LinkOutlined />,
        key: a.id,
        label: a.name.name,
      }))
    : [];

/**
 * Format the array of projects
 * @param {string[]} projects - name of project
 * @returns {string} - formatted duration
 */
const formatProjects = (projects) =>
  projects
    ? projects.map((i) => ({
        icon: <FileDoneOutlined />,
        key: i,
        label: i,
      }))
    : [];

/**
 * Extract and format the experience information
 * @param {object} dataSource - name of project
 * @param {object} intl - name of project
 * @returns {string} - formatted duration
 */
const formatExperienceInfo = (dataSource, intl) =>
  dataSource && dataSource.experiences
    ? dataSource.experiences.map(
        ({
          startDate,
          endDate,
          ongoingDate,
          description,
          jobTitle,
          organization,
          attachmentLinks,
          projects,
        }) => ({
          attachmentLinks: formatAttachmentLinks(attachmentLinks),
          description,
          duration: getExperienceDuration(
            startDate,
            endDate,
            ongoingDate,
            intl
          ),
          icon: "solution",
          jobTitle,
          organization,
          projects: formatProjects(projects),
        })
      )
    : [];

const ExperienceCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formattedExperienceInfo = useMemo(
    () => formatExperienceInfo(data, intl),
    [data, intl]
  );

  return (
    <ProfileCards
      cardName="experience"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/qualifications?tab=experience"
      id="card-profile-experience"
      lastUpdated={data.experiencesUpdatedAt}
      titleString={intl.formatMessage({ id: "experience" })}
      visibility={data.visibleCards.experience}
    >
      <ExperienceCardView experienceInfo={formattedExperienceInfo} />
    </ProfileCards>
  );
};

ExperienceCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

ExperienceCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default ExperienceCard;
