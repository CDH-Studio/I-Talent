import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import JobMobilityCardView from "./JobMobilityCardView";

const JobMobilityCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCards
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
        relocationLocations={data.relocationLocations}
      />
    </ProfileCards>
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
