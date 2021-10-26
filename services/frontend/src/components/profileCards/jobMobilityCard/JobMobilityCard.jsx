import { useMemo } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ProfileCardWrapper from "../profileCardWrapper/ProfileCardWrapper";
import JobMobilityCardView from "./JobMobilityCardView";

/**
 * Format the list of remote work locations
 * @param {string[]} relocationLocations - list of relocation cities
 * @returns {Array<{key: string, label: string}>} - formatted attachments
 */
const formatRelocationLocations = (relocationLocations) =>
  relocationLocations
    ? relocationLocations.map((location) => ({
        key: location.id,
        label: `${location.city}, ${location.province}`,
      }))
    : [];

const JobMobilityCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formattedRelocationLocations = useMemo(
    () => formatRelocationLocations(data.relocationLocations),
    [data.relocationLocations]
  );

  return (
    <ProfileCardWrapper
      cardName="careerInterests"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/career-management?tab=career-interests"
      id="card-profile-career-interests"
      titleString={intl.formatMessage({ id: "career.interests" })}
      visibility={data.visibleCards.careerInterests}
    >
      <JobMobilityCardView
        interestedInRemote={data.interestedInRemote}
        lookingJob={data.lookingJob}
        relocationLocations={formattedRelocationLocations}
      />
    </ProfileCardWrapper>
  );
};

JobMobilityCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

JobMobilityCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default JobMobilityCard;
