import React from "react";
import PropTypes from "prop-types";
import ProfileCards from "../profileCards/ProfileCards";
import CompetenciesView from "./CompetenciesView";
import { ProfileInfoPropType } from "../../customPropTypes";

const Competencies = ({ data, title, cardName, id, type, editUrl }) => {
  return (
    <ProfileCards
      title={title}
      content={<CompetenciesView competencies={data.competencies} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={data.visibleCards.competencies}
    />
  );
};

Competencies.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  editUrl: PropTypes.string,
};

Competencies.defaultProps = {
  data: null,
  type: null,
  editUrl: "",
};

export default Competencies;
