import React from "react";
import { FormattedMessage } from "react-intl";

import { Row, Col, List, Tag, Typography } from "antd";

function CareerInterestsView(props) {
  const generateCareerInterestsInfoList = (dataSource) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  };

  const generateRelocationLocationsInfoList = (dataSource) => {
    if (dataSource.length > 0) {
      return (
        <div style={{ marginBottom: "10px" }}>
          <Typography.Text strong>
            <FormattedMessage id="profile.willing.to.relocate.to" />:{" "}
          </Typography.Text>
          <div style={{ marginTop: "7px" }}>
            {dataSource.map((loc, index) => (
              <Tag color="#00c15b" key={index}>
                {loc}
              </Tag>
            ))}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  };

  return (
    <Row>
      <Col span={24}>
        {generateCareerInterestsInfoList(props.info)}
        {generateRelocationLocationsInfoList(props.relocationLocationsInfo)}
      </Col>
    </Row>
  );
}

export default CareerInterestsView;
