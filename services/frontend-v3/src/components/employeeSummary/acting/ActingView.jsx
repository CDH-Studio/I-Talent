import React from "react";
import PropTypes from "prop-types";
import { Row, Col, List } from "antd";
import { FormattedMessage } from "react-intl";

const ActingView = ({ values }) => {
  return (
    <Row>
      <Col span={24}>
        <List
          itemLayout="horizontal"
          dataSource={values}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

ActingView.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      description: PropTypes.node,
    })
  ).isRequired,
};

export default ActingView;
