import React from "react";
import PropTypes from "prop-types";
import { Row, Col, List } from "antd";
import { injectIntl } from "react-intl";

const SubstantiveView = ({ values }) => {
  return (
    <Row>
      <Col xs={24} lg={24} style={{ width: "100%" }}>
        <Row>
          <Col>
            <List
              itemLayout="horizontal"
              dataSource={values}
              renderItem={item => (
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

SubstantiveView.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.object, description: PropTypes.object })
  ).isRequired,
};

export default injectIntl(SubstantiveView);
