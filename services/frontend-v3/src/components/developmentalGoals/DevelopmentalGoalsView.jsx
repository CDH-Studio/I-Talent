import React from "react";
import { List, Tag, Row } from "antd";

function DevelopmentalGoalsView(props) {
  const devGoals = props.devGoals;
  return (
    <>
      <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
        <List>
          {Object.values(devGoals).map((devGoal) => (
            <Tag color="#114541">{devGoal}</Tag>
          ))}
        </List>
      </Row>
    </>
  );
}

export default DevelopmentalGoalsView;
