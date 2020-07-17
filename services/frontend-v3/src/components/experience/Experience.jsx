import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import PropTypes from "prop-types";
import ExperienceView from "./ExperienceView";
import { ProfileInfoPropType } from "../../customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const Experience = ({ data, type }) => {
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
      ({ startDate, endDate, description, jobTitle, organization }) => ({
        description,
        duration: getExperienceDuration(startDate, endDate),
        icon: "solution",
        jobTitle,
        organization,
      })
    );
  };

  return (
    <ProfileCards
      titleId="profile.experience"
      content={<ExperienceView experienceInfo={getExperienceInfo(data)} />}
      cardName="experience"
      id="card-profile-experience"
      editUrl="/secured/profile/edit/qualifications"
      data={data}
      type={type}
      visible={data.visibleCards.experience}
    />
  );
};

Experience.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

Experience.defaultProps = {
  data: null,
  type: null,
};

export default Experience;
