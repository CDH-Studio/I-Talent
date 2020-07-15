import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Row, Col, List, Empty } from "antd";

const ProjectsView = ({ projectsInfo }) => {
  if (projectsInfo.length > 0) {
    return (
      <Row>
        <Col xs={24} lg={24}>
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={projectsInfo}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Col>
      </Row>
    );
  }
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="profile.projects.empty" />}
    />
  );
};

ProjectsView.propTypes = {
  projectsInfo: PropTypes.arrayOf(
    PropTypes.shape({ projectDescription: PropTypes.string })
  ).isRequired,
};

export default ProjectsView;
