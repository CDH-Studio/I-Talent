import { useMemo } from "react";
import { useIntl } from "react-intl";
import { FileDoneOutlined, LinkOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import ExperienceCardView from "./ExperienceCardView";

const getExperienceDuration = (startDate, endDate, ongoingDate, intl) => {
  const formatedStartDate = dayjs(startDate).format("MMMM YYYY");
  const formatedEndDate = dayjs(endDate).format("MMMM YYYY");

  if (startDate && endDate) {
    return `${formatedStartDate} - ${formatedEndDate}`;
  }

  if (ongoingDate && startDate) {
    return `${formatedStartDate} - ${intl.formatMessage({
      id: "date.present",
    })}`;
  }

  if (ongoingDate) {
    return intl.formatMessage({
      id: "experience.date.present",
    });
  }

  if (startDate && !endDate) {
    return formatedStartDate;
  }

  if (!startDate && endDate) {
    return formatedEndDate;
  }

  return "-";
};

const formatAttachmentLinks = (attachmentLinks) =>
  attachmentLinks
    ? attachmentLinks.map((a) => ({
        href: a.url,
        icon: <LinkOutlined />,
        key: a.id,
        label: a.name.name,
      }))
    : [];

const formatProjects = (projects) =>
  projects
    ? projects.map((i) => ({
        icon: <FileDoneOutlined />,
        key: i,
        label: i,
      }))
    : [];

const getExperienceInfo = (dataSource, intl) => {
  if (!dataSource || !dataSource.experiences) {
    return [];
  }

  return dataSource.experiences.map(
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
      duration: getExperienceDuration(startDate, endDate, ongoingDate, intl),
      icon: "solution",
      jobTitle,
      organization,
      projects: formatProjects(projects),
    })
  );
};

const ExperienceCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formattedExperienceInfo = useMemo(
    () => getExperienceInfo(data, intl),
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
