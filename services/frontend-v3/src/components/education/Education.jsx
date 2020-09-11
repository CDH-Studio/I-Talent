import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import PropTypes from "prop-types";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import EducationView from "./EducationView";
import ProfileCards from "../profileCards/ProfileCards";

const Education = ({ data, editableCardBool }) => {
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
      ({
        startDate,
        endDate,
        diploma,
        school,
        description,
        attachmentLinks,
      }) => ({
        diploma: diploma.description,
        school: school.name,
        duration: getEducationDuration(startDate, endDate),
        description,
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
      titleId="profile.education"
      content={<EducationView educationInfo={getEducationInfo(data)} />}
      cardName="education"
      id="card-profile-education"
      editUrl="/profile/edit/qualifications?tab=education"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.education}
      lastUpdated={data.educationsUpdatedAt}
    />
  );
};

Education.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

Education.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default Education;
