import React from "react";
import PropTypes from "prop-types";
import { Row, Col, List } from "antd";
import ExperienceItem from "./experienceItem/ExperienceItem";

const ExperienceView = ({ experienceInfo }) => {
  return (
    <Row>
      <Col xs={24} lg={24}>
        <List
          itemLayout="vertical"
          dataSource={experienceInfo}
          renderItem={item => <ExperienceItem item={item} />}
        />
      </Col>
    </Row>
  );
};

ExperienceView.propTypes = {
  experienceInfo: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      duration: PropTypes.string,
      icon: PropTypes.string,
      jobTitle: PropTypes.string,
      organization: PropTypes.string,
    })
  ).isRequired,
};

export default ExperienceView;
