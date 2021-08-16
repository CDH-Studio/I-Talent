import "./FormLabelTooltipView.less";

import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import PropTypes from "prop-types";

const FormLabelTooltipView = ({ labelText, tooltipText }) => (
  <div style={{ display: "inline", marginRight: "10px" }}>
    {labelText}
    <Tooltip title={tooltipText}>
      <InfoCircleOutlined className="tooltipIcon" />
    </Tooltip>
  </div>
);

FormLabelTooltipView.propTypes = {
  labelText: PropTypes.node.isRequired,
  tooltipText: PropTypes.string.isRequired,
};

export default FormLabelTooltipView;
