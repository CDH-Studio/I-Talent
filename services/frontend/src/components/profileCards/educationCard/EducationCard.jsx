import { useMemo } from "react";
import { useIntl } from "react-intl";
import { LinkOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ProfileCardWrapper from "../profileCardWrapper/ProfileCardWrapper";
import EducationCardView from "./EducationCardView";

/**
 * Generate the formatted duration
 * @param {string} startDate - start date
 * @param {string} endDate - end date
 * @param {boolean} ongoingDate - is experience on going
 * @param {Object} intl - intl object
 * @returns {string} - formatted duration
 */
const formatEducationDuration = (startDate, endDate, ongoingDate, intl) => {
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

/**
 * Format the attachment links array
 * @param {Object[]} attachmentLinks - start date
 * @param {string} attachmentLinks[].href - link to attachment
 * @param {string} attachmentLinks[].id - unique id of attachment
 * @param {string} attachmentLinks[].name.name - name of the attachment type
 * @returns {Array<{href:string, icon: React.ReactElement, key: string, label: string}>} - formatted attachments
 */
const formatAttachmentLinks = (attachmentLinks) =>
  attachmentLinks
    ? attachmentLinks.map((a) => ({
        href: a.url,
        icon: <LinkOutlined />,
        key: a.id,
        label: a.name.name,
      }))
    : [];

/**
 * Extract and format the education information
 * @param {Object} dataSource - education information
 * @param {Object} intl - intl object
 * @returns {Object[]} - education information
 */
const formatEducationInfo = (dataSource, intl) =>
  dataSource && dataSource.educations
    ? dataSource.educations.map(
        ({
          startDate,
          endDate,
          ongoingDate,
          diploma,
          school,
          description,
          attachmentLinks,
        }) => ({
          attachmentLinks: formatAttachmentLinks(attachmentLinks),
          description,
          diploma: diploma.description,
          duration: formatEducationDuration(
            startDate,
            endDate,
            ongoingDate,
            intl
          ),
          school: school.name,
        })
      )
    : [];

const EducationCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formattedEducationInfo = useMemo(
    () => formatEducationInfo(data, intl),
    [data, intl]
  );

  return (
    <ProfileCardWrapper
      cardName="education"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/qualifications?tab=education"
      id="card-profile-education"
      lastUpdated={data.educationsUpdatedAt}
      titleString={intl.formatMessage({ id: "education" })}
      visibility={data.visibleCards.education}
    >
      <EducationCardView educationInfo={formattedEducationInfo} />
    </ProfileCardWrapper>
  );
};

EducationCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

EducationCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default EducationCard;
