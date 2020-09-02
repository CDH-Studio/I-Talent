import React from "react";
import PropTypes from "prop-types";
import CareerInterestsView from "./CareerInterestsView";
import ProfileCards from "../profileCards/ProfileCards";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const CareerInterests = ({ data, editableCardBool }) => (
  <ProfileCards
    titleId="profile.career.interests"
    content={
      <CareerInterestsView
        lookingJob={data.lookingJob}
        interestedInRemote={data.interestedInRemote}
        relocationLocations={data.relocationLocations}
      />
    }
    cardName="careerInterests"
    id="card-profile-career-interests"
    editUrl="/profile/edit/personal-growth?tab=career-interests"
    data={data}
    editableCardBool={editableCardBool}
    visibility={data.visibleCards.careerInterests}
  />
);

CareerInterests.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

CareerInterests.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default CareerInterests;
