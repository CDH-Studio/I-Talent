import React from "react";
import { List, Tag, Row, Empty } from "antd";
import { FormattedMessage } from "react-intl";
import { PropTypes } from "prop-types";

const DevelopmentalGoalsView = ({ devGoals }) => {
  /*
   * Generate Developmental Goals List
   *
   * Generate a list of Developmental Goals
   * If no competencies are found for the profile then display friendly message
   */
  if (devGoals.length > 0) {
    return (
      <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
        <List>
          {Object.values(devGoals).map(({ name, id }) => (
            <Tag color="#114541" key={id}>
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
      description={<FormattedMessage id="profile.developmental.goals.empty" />}
    />
  );
};

DevelopmentalGoalsView.propTypes = {
  devGoals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

DevelopmentalGoalsView.defaultProps = {
  devGoals: [],
};

export default DevelopmentalGoalsView;
