import React from "react";
import PropTypes from "prop-types";
import { Row, Col, List } from "antd";

const ConnectionsView = ({ connections }) => {
  return (
    <Row>
      <Col xs={24} lg={24}>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={connections}
          renderItem={(item) => (
            <List.Item>
              <a href={`/secured/profile/${item.id}`}>
                {item.lastName}, {item.firstName}
              </a>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

ConnectionsView.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape({ projectDescription: PropTypes.string })
  ).isRequired,
};

export default ConnectionsView;
