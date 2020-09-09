import React from "react";
import PropTypes from "prop-types";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import LearningDevelopmentView from "./LearningDevelopmentView";

const LearningDevelopment = ({ data, editableCardBool }) => {
  return (
    <ProfileCards
      titleId="profile.learning.development"
      content={<LearningDevelopmentView devGoals={data.developmentalGoals} />}
      cardName="developmentalGoals"
      id="card-profile-learning-development"
      editUrl="/profile/edit/personal-growth?tab=learning-development"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.developmentalGoals}
      lastUpdated={data.developmentalGoalsUpdatedAt}
    />
  );
};

LearningDevelopment.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

LearningDevelopment.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default LearningDevelopment;
