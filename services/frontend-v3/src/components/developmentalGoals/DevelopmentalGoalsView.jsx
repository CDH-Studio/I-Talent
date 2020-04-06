import React from "react";
import { List, Tag, Row, Empty } from "antd";

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
            {Object.values(devGoals).map((devGoals) => (
              <Tag color="#114541">{devGoals}</Tag>
            ))}
          </List>
        </Row>
      );
    } else {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="no developmental goals provided"
        />
      );
    }
  };
  return GenerateDevGoalsList(props.devGoals);
}

export default DevelopmentalGoalsView;
