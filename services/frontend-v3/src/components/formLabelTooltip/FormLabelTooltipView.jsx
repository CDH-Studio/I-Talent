import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const FormLabelTooltipView = ({ labelText, tooltipText }) => {
  /* Component Styles */
  const styles = {
    tooltipIcon: {
      color: "rgba(0,0,0,.45)",
      marginLeft: "5px",
    },
  };

  return (
    <div style={{ display: "inline", marginRight: "10px" }}>
      {labelText}
      <Tooltip title={tooltipText}>
        <InfoCircleOutlined style={styles.tooltipIcon} />
      </Tooltip>
    </div>
  );
};

FormLabelTooltipView.propTypes = {
  labelText: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
};

export default FormLabelTooltipView;
