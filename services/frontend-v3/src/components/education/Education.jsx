import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { ProfileInfoPropType } from "../../customPropTypes";
import EducationView from "./EducationView";

const Education = ({ data }) => {
  const getEducationDuration = (startDate, endDate) => {
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

  const getEducationInfo = (dataSource) => {
    if (!dataSource || !dataSource.experiences) {
      return [];
    }

    return dataSource.educations.map(
      ({ startDate, endDate, diploma, school }) => ({
        diploma: diploma.description,
        school: school.name,
        duration: getEducationDuration(startDate, endDate),
      })
    );
  };

  return <EducationView educationInfo={getEducationInfo(data)} />;
};

Education.propTypes = { data: ProfileInfoPropType.isRequired };

export default Education;
