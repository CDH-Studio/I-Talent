import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import EducationView from "./EducationView";
import ProfileCards from "../profileCards/ProfileCards";

const Education = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const getEducationDuration = (startDate, endDate, ongoingDate) => {
    const formatedStartDate = moment(startDate).format("MMMM YYYY");
    const formatedEndDate = moment(endDate).format("MMMM YYYY");

    if (startDate && endDate) {
      return `${formatedStartDate} - ${formatedEndDate}`;
    }

    if (ongoingDate && startDate) {
      return `${formatedStartDate} - ${intl.formatMessage({
        id: "date.present",
      })}`;
    }

    if (ongoingDate) {
      return intl.formatMessage({ id: "education.date.present" });
    }

    if (startDate && !endDate) {
      return formatedStartDate;
    }

    if (!startDate && endDate) {
      return formatedEndDate;
    }

    return "-";
  };

  const getEducationInfo = (dataSource) => {
    if (!dataSource || !dataSource.experiences) {
      return [];
    }
    return dataSource.educations.map(
      ({
        startDate,
        endDate,
        ongoingDate,
        diploma,
        school,
        description,
        attachmentLinks,
      }) => ({
        diploma: diploma.description,
        school: school.name,
        duration: getEducationDuration(startDate, endDate, ongoingDate),
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
      cardName="education"
      id="card-profile-education"
      editUrl="/profile/edit/qualifications?tab=education"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.education}
      lastUpdated={data.educationsUpdatedAt}
    >
      <EducationView educationInfo={getEducationInfo(data)} />
    </ProfileCards>
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
