import PropTypes from "prop-types";
import { List, Tag, Row, Empty } from "antd";
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
            <Tag color="#00605e" key={id}>
              {name}
            </Tag>
          ))}
        </List>
      </Row>
    );
  }
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="competencies.empty" />}
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
