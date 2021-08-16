import PropTypes from "prop-types";
import { List, Tag, Row, Empty } from "antd";
import { FormattedMessage } from "react-intl";
import "./EmploymentEquityView.less";

const EmploymentEquityView = ({ groups }) => {
  if (groups.length > 0) {
    return (
      <Row className="listRow">
        <List>
          {groups.map(({ key, text }) => (
            <Tag key={key} color="#727272">
              {text}
            </Tag>
          ))}
        </List>
      </Row>
    );
  }
  return (
    <Empty
      className="empty"
      description={<FormattedMessage id="employment.equity.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

EmploymentEquityView.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

EmploymentEquityView.defaultProps = {
  groups: [],
};

export default EmploymentEquityView;
