import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import ExperienceView from "./ExperienceView";
import { ProfileInfoPropType } from "../../customPropTypes";

const Experience = ({ data }) => {
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

  return <ExperienceView experienceInfo={getExperienceInfo(data)} />;
};

Experience.propTypes = {
  data: ProfileInfoPropType,
};

Experience.defaultProps = {
  data: null,
};

export default Experience;
