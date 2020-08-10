import React from "react";
import PropTypes from "prop-types";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import LearningDevelopmentView from "./LearningDevelopmentView";

const LearningDevelopment = ({ data, type }) => {
  return (
    <ProfileCards
      titleId="profile.learning.development"
      content={<LearningDevelopmentView devGoals={data.developmentalGoals} />}
      cardName="developmentalGoals"
      id="card-profile-learning-development"
      editUrl="/profile/edit/personal-growth?tab=learning-development"
      data={data}
      type={type}
      visible={data.visibleCards.developmentalGoals}
      lastUpdated={data.developmentalGoalsUpdatedAt}
    />
  );
};

LearningDevelopment.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

LearningDevelopment.defaultProps = {
  data: null,
  type: null,
};

export default LearningDevelopment;
