import { Empty, List, Row, Tag } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const CompetenciesView = ({ competencies }) => {
  /**
   * Generate Competencies Tag List
   *
   * Generate a list of Competency Tags
   * If no competencies are found for the profile then display friendly message
   */
  if (competencies.length > 0) {
    return (
      <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
        <List>
          {competencies.map(({ id, name }) => (
            <Tag key={id} color="#00605e">
              {name}
            </Tag>
          ))}
        </List>
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
