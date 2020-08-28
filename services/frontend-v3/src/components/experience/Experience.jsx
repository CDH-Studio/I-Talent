import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import PropTypes from "prop-types";
import ExperienceView from "./ExperienceView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const Experience = ({ data, editableCardBool }) => {
  const getExperienceDuration = (startDate, endDate) => {
    const formatedStartDate = moment(startDate).format("MMMM YYYY");
    const formatedEndDate = moment(endDate).format("MMMM YYYY");

    const dateNotProvided = <FormattedMessage id="profile.date.not.provided" />;

    let duration = "";

    if (startDate === null && endDate === null) {
      duration += dateNotProvided;
    } else if (startDate !== null && endDate === null) {
      duration = `${duration + formatedStartDate} - present`;
    } else {
      duration = `${duration + formatedStartDate} - ${formatedEndDate}`;
    }

    return duration;
  };

  const getExperienceInfo = (dataSource) => {
    if (!dataSource || !dataSource.experiences) {
      return [];
    }

    return dataSource.experiences.map(
      ({
        startDate,
        endDate,
        description,
        jobTitle,
        organization,
        attachmentLinks,
      }) => ({
        description,
        duration: getExperienceDuration(startDate, endDate),
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
      })
    );
  };

  return (
    <ProfileCards
      titleId="profile.experience"
      content={<ExperienceView experienceInfo={getExperienceInfo(data)} />}
      cardName="experience"
      id="card-profile-experience"
      editUrl="/profile/edit/qualifications?tab=experience"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.experience}
      lastUpdated={data.experiencesUpdatedAt}
    />
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
