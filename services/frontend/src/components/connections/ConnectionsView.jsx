import PropTypes from "prop-types";
import { Row, Col, List, Empty, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const { Text } = Typography;

const ConnectionsView = ({ connections }) => {
  if (connections.length > 0) {
    return (
      <Row>
        <Col xs={24} lg={24}>
          <FormattedMessage id="connections.usage.info" />
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={connections}
            className="mt-2"
            renderItem={(item) => (
              <List.Item key={item.id}>
                <div className="d-flex">
                  <Link to={`/profile/${item.id}`} className="d-flex">
                    <Avatar
                      icon={<UserOutlined aria-hidden="true" />}
                      className="mr-2 mt-1"
                    />
                    <div>
                      <Text strong className="d-block">
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text type="secondary" className="d-block">
                        {item.email}
                      </Text>
                    </div>
                  </Link>
                </div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  }
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="connections.usage.info" />}
    />
  );
};

ConnectionsView.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape({ projectDescription: PropTypes.string })
  ).isRequired,
};

export default ConnectionsView;
