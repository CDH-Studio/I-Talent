import React, { Component } from "react";
import { List, Tag, Row } from "antd";

function CompetenciesView(props) {
  const competencies = props.competencies;
  return (
    <>
      <Row>
        <List>
          {Object.values(competencies).map(competency => (
            <Tag style={{ marginBottom: "8px", marginTop: "8px" }}>
              {competency}
            </Tag>
          ))}
        </List>
      </Row>
    </>
  );
}

export default CompetenciesView;
