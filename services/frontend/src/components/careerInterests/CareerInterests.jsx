import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import CareerInterestsView from "./CareerInterestsView";

const CareerInterests = ({ data, editableCardBool }) => {
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
      <CareerInterestsView
        interestedInRemote={data.interestedInRemote}
        lookingJob={data.lookingJob}
        relocationLocations={data.relocationLocations}
      />
    </ProfileCards>
  );
};

CareerInterests.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

CareerInterests.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default CareerInterests;
