import React from "react";
import { List, Tag, Row, Empty } from "antd";
import { FormattedMessage } from "react-intl";
import { PropTypes } from "prop-types";

function DevelopmentalGoalsView({ devGoals }) {
  /*
   * Generate Developmental Goals List
   *
   * Generate a list of Developmental Goals
   * If no competencies are found for the profile then display friendly message
   */
  const GenerateDevGoalsList = (_devGoals) => {
    if (_devGoals.length > 0) {
      return (
        <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
          <List>
            {Object.values(_devGoals).map((devGoal, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tag color="#114541" key={index}>
                {devGoal}
              </Tag>
            ))}
          </List>
        </Row>
      );
    }
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <FormattedMessage id="profile.developmental.goals.empty" />
        }
      />
    );
  };
  return GenerateDevGoalsList(devGoals);
}

DevelopmentalGoalsView.propTypes = {
  devGoals: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DevelopmentalGoalsView;
