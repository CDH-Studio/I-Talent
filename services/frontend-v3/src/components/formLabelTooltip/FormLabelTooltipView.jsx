import React from "react";

import { Tooltip } from "antd";

import { InfoCircleOutlined } from "@ant-design/icons";

function FormLabelTooltipView(props) {
  /* Component Styles */
  const styles = {
    tooltipIcon: {
      color: "rgba(0,0,0,.45)",
      marginLeft: "5px",
    },
  };

  return (
    <div style={{ display: "inline", marginRight: "10px" }}>
      {props.labelText}
      <Tooltip title={props.tooltipText}>
        <InfoCircleOutlined style={styles.tooltipIcon} />
      </Tooltip>
    </div>
  );
}

export default FormLabelTooltipView;
