import React from "react";
import PropTypes from "prop-types";
import { ProfileInfoPropType } from "../../customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import DevelopmentalGoalsView from "./DevelopmentalGoalsView";

const DevelopmentalGoals = ({ data, title, cardName, id, type, editUrl }) => {
  return (
    <ProfileCards
      title={title}
      content={<DevelopmentalGoalsView devGoals={data.developmentalGoals} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={data.visibleCards.developmentalGoals}
    />
  );
};

DevelopmentalGoals.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  editUrl: PropTypes.string,
};

DevelopmentalGoals.defaultProps = {
  data: null,
  type: null,
  editUrl: "",
};

export default DevelopmentalGoals;
