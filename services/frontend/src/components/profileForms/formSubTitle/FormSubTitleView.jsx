import PropTypes from "prop-types";
import { Row, Typography, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import "./FormSubTitleView.less";

const { Title } = Typography;

const FormSubTitleView = ({ title, popoverMessage, extra }) => (
  <Row align="middle" className="profileForm-section" justify="space-between">
    <Title className="profileForm-subtitle" level={3}>
      <Row>
        {title}
        {popoverMessage && (
          <Popover content={popoverMessage} trigger={["focus", "hover"]}>
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
