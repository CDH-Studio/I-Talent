import PropTypes from "prop-types";
import { Row, Col, List } from "antd";
import { injectIntl } from "react-intl";

const SubstantiveView = ({ values }) => {
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

SubstantiveView.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default injectIntl(SubstantiveView);
