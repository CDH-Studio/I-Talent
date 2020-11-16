import React from "react";
import PropTypes from "prop-types";
import { Row, Typography, Popover } from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import "./FormSubTitleView.less";

const { Title, Text } = Typography;

const FormSubTitleView = ({ title, popoverMessage, extra }) => {
  return (
    <Row justify="space-between" className="pgf-sectionHeader" align="middle">
      <Title level={3} className="profileForm-subtitle">
        <Row>
          {title}
          {popoverMessage && (
            <Popover trigger={["focus", "hover"]} content={popoverMessage}>
              <div className="pgf-infoIcon">
                <InfoCircleOutlined tabIndex={0} />
              </div>
            </Popover>
          )}
        </Row>
      </Title>
      {extra && <div className="profileForm-extra">{extra}</div>}
    </Row>
  );
};

FormSubTitleView.propTypes = {
  title: PropTypes.node.isRequired,
  popoverMessage: PropTypes.node,
  extra: PropTypes.node,
};

FormSubTitleView.defaultProps = {
  popoverMessage: null,
  extra: null,
};

export default FormSubTitleView;
