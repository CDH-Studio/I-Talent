import PropTypes from "prop-types";

import {
  FieldPropType,
  FormInstancePropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";
import ExperienceFormView from "./ExperienceFormView";

/**
 *  ExperienceForm(props)
 *  Controller for the ExperienceFormView.
 *  This component is strongly linked ot Qualifications Form.
 *  It generated the form fields for each experience item the user creates in the qualifications form.
 */
const ExperienceForm = ({
  form,
  fieldElement,
  removeElement,
  checkIfFormValuesChanged,
  attachmentNames,
}) => (
  <ExperienceFormView
    attachmentNames={attachmentNames}
    checkIfFormValuesChanged={checkIfFormValuesChanged}
    fieldElement={fieldElement}
    form={form}
    removeElement={removeElement}
  />
);

ExperienceForm.propTypes = {
  attachmentNames: KeyNameOptionsPropType.isRequired,
  checkIfFormValuesChanged: PropTypes.func.isRequired,
  fieldElement: FieldPropType.isRequired,
  form: FormInstancePropType.isRequired,
  removeElement: PropTypes.func.isRequired,
};

export default ExperienceForm;
