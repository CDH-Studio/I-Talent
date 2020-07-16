import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import PropTypes from "prop-types";
import { ProfileInfoPropType } from "../../customPropTypes";
import EducationView from "./EducationView";
import ProfileCards from "../profileCards/ProfileCards";

const Education = ({ data, title, cardName, id, type, editUrl }) => {
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
      title={title}
      content={<EducationView educationInfo={getEducationInfo(data)} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={data.visibleCards.education}
    />
  );
};

Education.propTypes = {
  data: ProfileInfoPropType.isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  editUrl: PropTypes.string,
};

Education.defaultProps = {
  type: null,
  editUrl: "",
};

export default Education;
