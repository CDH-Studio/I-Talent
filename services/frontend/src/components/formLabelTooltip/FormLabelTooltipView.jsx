import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./FormLabelTooltipView.less";

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
