import React from "react";
import PropTypes from "prop-types";
import ProfileCards from "../profileCards/ProfileCards";
import CompetenciesView from "./CompetenciesView";

const Competencies = ({
  data,
  title,
  cardName,
  id,
  type,
  visible,
  editUrl,
}) => {
  return (
    <ProfileCards
      title={title}
      content={<CompetenciesView competencies={data.competencies} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={visible}
    />
  );
};

Competencies.propTypes = {
  data: PropTypes.shape({
    competencies: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.shape({
          en: PropTypes.string,
          fr: PropTypes.string,
        }),
        id: PropTypes.string,
      })
    ),
  }).isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
  editUrl: PropTypes.string,
};

Competencies.defaultProps = {
  type: null,
  visible: null,
  editUrl: "",
};

export default Competencies;
