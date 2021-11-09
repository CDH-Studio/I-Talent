import { FormattedMessage } from "react-intl";
import { Empty, Row } from "antd";
import PropTypes from "prop-types";

import TagList from "../../tagList/TagList";

const CompetenciesCardView = ({ competencies }) =>
  competencies && competencies.length > 0 ? (
    <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
      <TagList data={competencies} tagStyle="primary" />
    </Row>
  ) : (
    <Empty
      description={<FormattedMessage id="competencies.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );

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
