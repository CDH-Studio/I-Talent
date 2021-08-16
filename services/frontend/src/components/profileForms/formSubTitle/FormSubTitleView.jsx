import "./FormSubTitleView.less";

import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover, Row, Typography } from "antd";
import PropTypes from "prop-types";

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
  extra: PropTypes.node,
  popoverMessage: PropTypes.node,
  title: PropTypes.node.isRequired,
};

FormSubTitleView.defaultProps = {
  extra: null,
  popoverMessage: null,
};

export default FormSubTitleView;
