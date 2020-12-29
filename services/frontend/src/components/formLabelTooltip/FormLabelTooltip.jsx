import PropTypes from "prop-types";
import FormLabelTooltipView from "./FormLabelTooltipView";

const FormLabelTooltip = ({ labelText, tooltipText }) => (
    <FormLabelTooltipView labelText={labelText} tooltipText={tooltipText} />
  );

FormLabelTooltip.propTypes = {
  labelText: PropTypes.node.isRequired,
  tooltipText: PropTypes.string.isRequired,
};

export default FormLabelTooltip;
