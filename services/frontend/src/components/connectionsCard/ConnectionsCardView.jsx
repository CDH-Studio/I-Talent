import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Empty, List, Row, Typography } from "antd";
import PropTypes from "prop-types";

const { Text } = Typography;

const ConnectionsView = ({ connections }) => {
  if (connections.length > 0) {
    return (
      <Row>
        <Col lg={24} xs={24}>
          <FormattedMessage id="connections.usage.info" />
          <List
            className="mt-2"
            dataSource={connections}
            itemLayout="horizontal"
            renderItem={(item) => (
              <List.Item key={item.id}>
                <div className="d-flex">
                  <Link className="d-flex" to={`/profile/${item.id}`}>
                    <Avatar
                      className="mr-2 mt-1"
                      icon={<UserOutlined aria-hidden="true" />}
                    />
                    <div>
                      <Text className="d-block" strong>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text className="d-block" type="secondary">
                        {item.email}
                      </Text>
                    </div>
                  </Link>
                </div>
              </List.Item>
            )}
            size="small"
          />
        </Col>
      </Row>
    );
  }
  return (
    <Empty
      description={<FormattedMessage id="connections.usage.info" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

ConnectionsView.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      firstname: PropTypes.string,
      id: PropTypes.string,
      lastname: PropTypes.string,
    })
  ).isRequired,
};

export default ConnectionsView;
