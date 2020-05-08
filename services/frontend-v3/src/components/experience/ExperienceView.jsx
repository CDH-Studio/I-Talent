import React from "react";
import { Row, Col, List } from "antd";
import ExperienceItem from "./experienceItem/ExperienceItem";

function ExperienceView(props) {
  /* Component Styles */
  const styles = {
    card: {
      height: "100%",
    },
  };
  const generateExperienceInfoList = (dataSource) => {
    return (
      <List
        itemLayout="vertical"
        dataSource={dataSource}
        renderItem={(item) => <ExperienceItem item={item} />}
      />
    );
  };

  const { experienceInfo } = props;

  return (
    <Row>
      <Col xs={24} lg={24}>
        {generateExperienceInfoList(experienceInfo)}
      </Col>
    </Row>
  );
}

export default ExperienceView;
