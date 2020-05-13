import React from "react";
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
  const generateCompetenciesTagList = () => {
    if (competencies.length > 0) {
      return (
        <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
          <List>
            {Object.values(competencies).map((competency, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tag color="#003d74" key={index}>
                {competency}
              </Tag>
            ))}
          </List>
        </Row>
      );
    }
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<FormattedMessage id="profile.competencies.empty" />}
      />
    );
  };

  return generateCompetenciesTagList();
};

CompetenciesView.propTypes = {
  competencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CompetenciesView;
