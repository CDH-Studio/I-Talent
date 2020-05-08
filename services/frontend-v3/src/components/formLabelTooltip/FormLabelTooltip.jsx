import React from "react";

import FormLabelTooltipView from "./FormLabelTooltipView";

function FormLabelTooltip(props) {
  return (
    <FormLabelTooltipView
      labelText={props.labelText}
      tooltipText={props.tooltipText}
    />
  );
}

export default FormLabelTooltip;
