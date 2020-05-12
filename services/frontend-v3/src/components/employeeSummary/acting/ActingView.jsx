import React from "react";
import PropTypes from "prop-types";
import { Row, Col, List } from "antd";

const ActingView = ({ values }) => {
  return (
    <Row>
      <Col xs={24} lg={24}>
        <Row>
          <Col>
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
      </Col>
    </Row>
  );
};

ActingView.propTypes = {
  values: PropTypes.isRequired,
};

export default ActingView;
