import { useIntl } from "react-intl";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import ExperienceCardView from "./ExperienceCardView";

const ExperienceCard = ({ data, editableCardBool }) => {
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
        attachmentLinks: attachmentLinks
          ? attachmentLinks.map((a) => ({
              id: a.id,
              name: a.name.name,
              url: a.url,
            }))
          : [],
        description,
        duration: getExperienceDuration(startDate, endDate, ongoingDate),
        icon: "solution",
        jobTitle,
        organization,
        projects,
      })
    );
  };

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
      <ExperienceCardView experienceInfo={getExperienceInfo(data)} />
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
