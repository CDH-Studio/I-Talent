import React from "react";
import PropTypes from "prop-types";
import { Row, Col, List } from "antd";

const ProjectsView = ({ projectsInfo }) => {
  return (
    <Row>
      <Col xs={24} lg={24}>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={projectsInfo}
          renderItem={(item) => (
            <List.Item>{item.projectDescription}</List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

ProjectsView.propTypes = {
  projectsInfo: PropTypes.isRequired,
};

export default ProjectsView;
