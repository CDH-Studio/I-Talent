import dayjs from "dayjs";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import ExperienceView from "./ExperienceView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const Experience = ({ data, editableCardBool }) => {
  const intl = useIntl();
  const getExperienceDuration = (startDate, endDate, ongoingDate) => {
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

  const getExperienceInfo = (dataSource) => {
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
        description,
        duration: getExperienceDuration(startDate, endDate, ongoingDate),
        icon: "solution",
        jobTitle,
        organization,
        attachmentLinks: attachmentLinks
          ? attachmentLinks.map((a) => ({
            id: a.id,
            name: a.name.name,
            url: a.url,
          }))
          : [],
        projects,
      })
    );
  };

  return (
    <ProfileCards
      titleId="experience"
      cardName="experience"
      id="card-profile-experience"
      editUrl="/profile/edit/qualifications?tab=experience"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.experience}
      lastUpdated={data.experiencesUpdatedAt}
    >
      <ExperienceView experienceInfo={getExperienceInfo(data)} />
    </ProfileCards>
  );
};

Experience.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

Experience.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default Experience;
