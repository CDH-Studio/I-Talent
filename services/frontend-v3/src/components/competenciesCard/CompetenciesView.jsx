import React from "react";
import { List, Tag, Row, Empty } from "antd";

function CompetenciesView(props) {
  /*
   * Generate Competencies Tag List
   *
   * Generate a list of Competency Tags
   * If no competencies are found for the profile then display friendly message
   */
  const generateCompetenciesTagList = (competencies) => {
    if (competencies.length > 0) {
      return (
        <Row style={{ paddingBottom: "8px", paddingTop: "8px" }}>
          <List>
            {Object.values(competencies).map((competency) => (
              <Tag color="#003d74">{competency}</Tag>
            ))}
          </List>
        </Row>
      );
    } else {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="no competencies provided"
        />
      );
    }
  };

  return generateCompetenciesTagList(props.competencies);
}

export default CompetenciesView;
