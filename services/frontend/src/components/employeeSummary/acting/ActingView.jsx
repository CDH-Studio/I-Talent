import PropTypes from "prop-types";
import { Row, Col, List } from "antd";

const ActingView = ({ values }) => (
  <Row>
    <Col span={24}>
      <List
        itemLayout="horizontal"
        dataSource={values}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Col>
  </Row>
);

ActingView.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      description: PropTypes.node,
    })
  ).isRequired,
};

export default ActingView;
