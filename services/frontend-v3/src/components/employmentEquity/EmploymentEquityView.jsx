import React from "react";
import PropTypes from "prop-types";
import { List, Tag, Row, Empty } from "antd";
import { FormattedMessage } from "react-intl";
import "./EmploymentEquityView.scss";

const EmploymentEquityView = ({ groups }) => {
  if (groups.length > 0) {
    return (
      <Row className="listRow">
        <List>
          {groups.map(({ key, text }) => (
            <Tag color="#727272" key={key}>
              {text}
            </Tag>
          ))}
        </List>
      </Row>
    );
  }
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="profile.employment.equity.empty" />}
      className="empty"
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
