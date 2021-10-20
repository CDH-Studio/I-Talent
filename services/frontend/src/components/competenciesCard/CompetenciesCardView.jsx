import { FormattedMessage } from "react-intl";
import { Empty, Row } from "antd";
import PropTypes from "prop-types";

import TagList from "../tagList/TagList";

/**
 * Generate Competencies Tag List
 *
 * Generate a list of Competency Tags
 * If no competencies are found for the profile then display friendly message
 */
const CompetenciesCardView = ({ competencies }) => {
  if (competencies.length > 0) {
    return (
      <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
        <TagList data={competencies} />
      </Row>
    );
  }
  return (
    <Empty
      description={<FormattedMessage id="competencies.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

CompetenciesCardView.propTypes = {
  competencies: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string,
      key: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

CompetenciesCardView.defaultProps = {
  competencies: [],
};

export default CompetenciesCardView;
