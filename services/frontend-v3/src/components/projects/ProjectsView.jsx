import React from "react";

import { Row, Col, List } from "antd";

function ProjectsView(props) {
  const generateProjectsInfoList = (dataSource) => {
    return (
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => <List.Item>{item.projectDescription}</List.Item>}
      />
    );
  };

  const { projectsInfo } = props;

  return (
    <Row>
      <Col xs={24} lg={24}>
        {generateProjectsInfoList(projectsInfo)}
      </Col>
    </Row>
  );
}
export default ProjectsView;
