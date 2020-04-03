import React from "react";

import { Row, Col, List } from "antd";

function TalentManagementView(props) {
  const generateTalentManagementInfoList = dataSource => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  };

  const info = props.info;

  return (
    <Row>
      <Col xs={24} lg={24}>
        {generateTalentManagementInfoList(info)}
      </Col>
    </Row>
  );
}

export default TalentManagementView;
