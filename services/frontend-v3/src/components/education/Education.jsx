import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import PropTypes from "prop-types";
import { ProfileInfoPropType } from "../../customPropTypes";
import EducationView from "./EducationView";
import ProfileCards from "../profileCards/ProfileCards";

const Education = ({ data, type }) => {
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
  return (
    <ProfileCards
      titleId="profile.education"
      content={<EducationView educationInfo={getEducationInfo(data)} />}
      cardName="education"
      id="card-profile-education"
      editUrl="/secured/profile/edit/qualifications"
      data={data}
      type={type}
      visible={data.visibleCards.education}
    />
  );
};

Education.propTypes = {
  data: ProfileInfoPropType.isRequired,
  type: PropTypes.bool,
};

Education.defaultProps = {
  type: null,
};

export default Education;
