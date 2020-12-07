import PropTypes from "prop-types";
import { Row, Col, List, Empty } from "antd";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const ConnectionsView = ({ connections }) => {
  if (connections.length > 0) {
    return (
      <Row>
        <Col xs={24} lg={24}>
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={connections}
            renderItem={(item) => (
              <List.Item>
                <Link to={`/profile/${item.id}`}>
                  {item.lastName}, {item.firstName}
                </Link>
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
      description={<FormattedMessage id="profile.private.group.empty" />}
    />
  );
};

ConnectionsView.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape({ projectDescription: PropTypes.string })
  ).isRequired,
};

export default ConnectionsView;
