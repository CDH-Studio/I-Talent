import React from "react";
import PropTypes from "prop-types";
import ProfileCards from "../profileCards/ProfileCards";
import CompetenciesView from "./CompetenciesView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const Competencies = ({ data, type }) => {
  return (
    <ProfileCards
      titleId="profile.competencies"
      content={<CompetenciesView competencies={data.competencies} />}
      cardName="competencies"
      id="card-profile-competency"
      editUrl="/profile/edit/talent"
      data={data}
      type={type}
      visible={data.visibleCards.competencies}
      lastUpdated={data.competenciesUpdatedAt}
    />
  );
};

Competencies.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

Competencies.defaultProps = {
  data: null,
  type: null,
};

export default Competencies;
