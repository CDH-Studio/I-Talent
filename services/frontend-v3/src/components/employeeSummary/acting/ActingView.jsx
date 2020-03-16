import React from "react";
import { Row, Col, List } from "antd";
import { injectIntl } from "react-intl";

function ActingView(props) {
  const generateInfoList = dataSource => {
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

  return (
    <Row>
      <Col xs={24} lg={24}>
        <Row>
          <Col>{generateInfoList(props.values)}</Col>
        </Row>
      </Col>
    </Row>
  );
}

export default injectIntl(ActingView);
