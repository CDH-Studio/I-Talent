import PropTypes from "prop-types";

import FormControlButtonsView from "./FormControlButtonsView";

/**
 * Bottom form buttons used to save, clear,
 * and navigate through the forms
 */
const FormControlButtons = ({
  formType,
  onSave,
  onSaveAndNext,
  onSaveAndFinish,
  onReset,
  onFinish,
  fieldsChanged,
  visibleCards,
}) => (
  <FormControlButtonsView
    edit={formType === "edit"}
    create={formType === "create"}
    onSave={onSave}
    onSaveAndNext={onSaveAndNext}
    onSaveAndFinish={onSaveAndFinish}
    onReset={onReset}
    onFinish={onFinish}
    fieldsChanged={fieldsChanged}
    visibleCards={visibleCards}
  />
);

FormControlButtons.propTypes = {
  formType: PropTypes.oneOf(["edit", "create"]).isRequired,
  onSave: PropTypes.func.isRequired,
  onSaveAndNext: PropTypes.func,
  onSaveAndFinish: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  fieldsChanged: PropTypes.bool.isRequired,
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
};

FormControlButtons.defaultProps = {
  onSaveAndNext: undefined,
};

export default FormControlButtons;
