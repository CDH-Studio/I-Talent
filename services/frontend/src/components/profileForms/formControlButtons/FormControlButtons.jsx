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
    create={formType === "create"}
    edit={formType === "edit"}
    fieldsChanged={fieldsChanged}
    onFinish={onFinish}
    onReset={onReset}
    onSave={onSave}
    onSaveAndFinish={onSaveAndFinish}
    onSaveAndNext={onSaveAndNext}
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
