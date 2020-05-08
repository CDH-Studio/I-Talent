import React from "react";
import { List, Tag, Row, Empty } from "antd";
import { FormattedMessage } from "react-intl";

function DevelopmentalGoalsView(props) {
  /*
   * Generate Developmental Goals List
   *
   * Generate a list of Developmental Goals
   * If no competencies are found for the profile then display friendly message
   */
  const GenerateDevGoalsList = (devGoals) => {
    if (devGoals.length > 0) {
      return (
        <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
          <List>
            {Object.values(devGoals).map((devGoals, index) => (
              <Tag color="#114541" key={index}>
                {devGoals}
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
  return GenerateDevGoalsList(props.devGoals);
}

export default DevelopmentalGoalsView;
