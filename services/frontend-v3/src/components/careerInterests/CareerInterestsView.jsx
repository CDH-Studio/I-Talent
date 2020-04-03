import React from "react";
import { FormattedMessage } from "react-intl";

import { Row, Col, List, Tag, Typography } from "antd";

function CareerInterestsView(props) {
  const generateCareerInterestsInfoList = dataSource => {
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

  const generateRelocationLocationsInfoList = dataSource => {
    return (
      <div>
        <Typography.Text strong>
          <FormattedMessage id="profile.willing.to.relocate.to" />:{" "}
        </Typography.Text>
        {dataSource.map(loc => (
          <Tag>{loc}</Tag>
        ))}
      </div>
    );
  };

  const info = props.info;
  const relocationLocationsInfo = props.relocationLocationsInfo;
  return (
    <Row>
      <Col span={24}>
        {generateCareerInterestsInfoList(info)}
        {generateRelocationLocationsInfoList(relocationLocationsInfo)}
      </Col>
    </Row>
  );
}

export default CareerInterestsView;
