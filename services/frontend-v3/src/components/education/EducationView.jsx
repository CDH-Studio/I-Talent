import React from "react";

import { Icon as LegacyIcon } from "@ant-design/compatible";

import { Row, Col, Avatar, List } from "antd";

function EducationView(props) {
  /* Component Styles */
  const styles = {
    card: {
      height: "100%"
    },
    avatar: {
      backgroundColor: "#007471"
    }
  };

  const generateEducationInfoList = dataSource => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item extra={item.duration}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={styles.avatar}
                  size="large"
                  icon={<LegacyIcon type={item.icon} />}
                  shape="square"
                />
              }
              title={item.diploma}
              description={item.school}
            />
          </List.Item>
        )}
      />
    );
  };

  const educationInfo = props.educationInfo;

  return (
    <Row>
      <Col xs={24} lg={24}>
        {generateEducationInfoList(educationInfo)}
      </Col>
    </Row>
  );
}

export default EducationView;
