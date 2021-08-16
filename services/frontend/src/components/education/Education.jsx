import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import EducationView from "./EducationView";

const Education = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const getEducationDuration = (startDate, endDate, ongoingDate) => {
    const formattedStartDate = dayjs(startDate).format("MMMM YYYY");
    const formattedEndDate = dayjs(endDate).format("MMMM YYYY");

    if (startDate && endDate) {
      return `${formattedStartDate} - ${formattedEndDate}`;
    }

    if (ongoingDate && startDate) {
      return `${formattedStartDate} - ${intl.formatMessage({
        id: "date.present",
      })}`;
    }

    if (ongoingDate) {
      return intl.formatMessage({ id: "education.date.present" });
    }

    if (startDate && !endDate) {
      return formattedStartDate;
    }

    if (!startDate && endDate) {
      return formattedEndDate;
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
        attachmentLinks: attachmentLinks
          ? attachmentLinks.map((a) => ({
              id: a.id,
              name: a.name.name,
              url: a.url,
            }))
          : [],
        description,
        diploma: diploma.description,
        duration: getEducationDuration(startDate, endDate, ongoingDate),
        school: school.name,
      })
    );
  };

  return (
    <ProfileCards
      cardName="education"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/qualifications?tab=education"
      id="card-profile-education"
      lastUpdated={data.educationsUpdatedAt}
      titleString={intl.formatMessage({ id: "education" })}
      visibility={data.visibleCards.education}
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
