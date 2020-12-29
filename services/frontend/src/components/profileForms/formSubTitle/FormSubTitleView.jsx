import PropTypes from "prop-types";
import { Row, Typography, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import "./FormSubTitleView.less";

const { Title } = Typography;

const FormSubTitleView = ({ title, popoverMessage, extra }) => (
  <Row justify="space-between" className="profileForm-section" align="middle">
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
