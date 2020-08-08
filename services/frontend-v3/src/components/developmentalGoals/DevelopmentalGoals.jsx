import React from "react";
import PropTypes from "prop-types";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import DevelopmentalGoalsView from "./DevelopmentalGoalsView";

const DevelopmentalGoals = ({ data, type }) => {
  return (
    <ProfileCards
      titleId="profile.developmental.goals"
      content={<DevelopmentalGoalsView devGoals={data.developmentalGoals} />}
      cardName="developmentalGoals"
      id="card-profile-dev-goals"
      editUrl="/profile/edit/personal-growth?tab=developmental-goals"
      data={data}
      type={type}
      visible={data.visibleCards.developmentalGoals}
      lastUpdated={data.developmentalGoalsUpdatedAt}
    />
  );
};

DevelopmentalGoals.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

DevelopmentalGoals.defaultProps = {
  data: null,
  type: null,
};

export default DevelopmentalGoals;
