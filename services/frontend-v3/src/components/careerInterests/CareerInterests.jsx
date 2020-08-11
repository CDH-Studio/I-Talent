import React from "react";
import PropTypes from "prop-types";
import CareerInterestsView from "./CareerInterestsView";
import ProfileCards from "../profileCards/ProfileCards";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const CareerInterests = ({ data, type }) => (
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
    type={type}
    visible={data.visibleCards.careerInterests}
  />
);

CareerInterests.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

CareerInterests.defaultProps = {
  data: null,
  type: null,
};

export default CareerInterests;
