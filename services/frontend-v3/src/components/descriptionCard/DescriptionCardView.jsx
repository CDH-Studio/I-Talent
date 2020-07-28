import React from "react";
import PropTypes from "prop-types";
import { List, Tag, Row, Empty } from "antd";
import { FormattedMessage } from "react-intl";

const CompetenciesView = ({ data }) => {
  /**
   * Generate Competencies Tag List
   *
   * Generate a list of Competency Tags
   * If no competencies are found for the profile then display friendly message
   */

  return (
    data.description ||
    "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder or filler text. It's a convenient tool for mock-ups.Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder or filler text. It's a convenient tool for mock-ups.Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder or filler text. It's a convenient tool for mock-ups.Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder or filler text. It's a convenient tool for mock-ups. Lorem ipsum is a pseudo-Latin text used in web design, typography wasd"
  );
  /*
<Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
      DESCRIPTION HERE
    </Row>
  */
};

CompetenciesView.propTypes = {
  competencies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

CompetenciesView.defaultProps = {
  competencies: [],
};

export default CompetenciesView;
