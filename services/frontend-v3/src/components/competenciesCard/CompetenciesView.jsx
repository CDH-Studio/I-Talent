import React from "react";
import { List, Tag, Row } from "antd";

function CompetenciesView(props) {
  const competencies = props.competencies;
  return (
    <>
      <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
        <List>
          {Object.values(competencies).map((competency) => (
            <Tag color="#003d74">{competency}</Tag>
          ))}
        </List>
      </Row>
    </>
  );
}

export default CompetenciesView;
