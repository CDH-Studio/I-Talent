import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Row, Col, List, Tag, Typography } from "antd";

const CareerInterestsView = ({ info, relocationLocationsInfo }) => {
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
    if (dataSource.length > 0) {
      return (
        <div style={{ marginBottom: "10px" }}>
          <Typography.Text strong>
            <FormattedMessage id="profile.willing.to.relocate.to" />:{" "}
          </Typography.Text>
          <div style={{ marginTop: "7px" }}>
            {dataSource.map((loc, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tag color="#00c15b" key={index}>
                {loc}
              </Tag>
            ))}
          </div>
        </div>
      );
    }
    return <div />;
  };

  return (
    <Row>
      <Col span={24}>
        {generateCareerInterestsInfoList(info)}
        {generateRelocationLocationsInfoList(relocationLocationsInfo)}
      </Col>
    </Row>
  );
};

CareerInterestsView.propTypes = {
  info: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.oneOfType([
        PropTypes.symbol,
        PropTypes.string,
        PropTypes.object,
      ]),
      icon: PropTypes.string,
      title: PropTypes.oneOfType([
        PropTypes.symbol,
        PropTypes.string,
        PropTypes.object,
      ]),
    })
  ).isRequired,
  relocationLocationsInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CareerInterestsView;
