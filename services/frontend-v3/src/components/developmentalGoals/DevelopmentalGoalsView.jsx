import React, { Component } from "react";
import { List, Tag, Row } from "antd";

function DevelopmentalGoalsView(props) {
  const devGoals = props.devGoals;
  return (
    <>
      <Row>
        <List>
          {Object.values(devGoals).map(devGoal => (
            <Tag style={{ marginBottom: "8px", marginTop: "8px" }}>
              {devGoal}
            </Tag>
          ))}
        </List>
      </Row>
    </>
  );
}

export default DevelopmentalGoalsView;
