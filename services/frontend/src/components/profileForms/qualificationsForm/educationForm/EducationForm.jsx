import PropTypes from "prop-types";

import {
  FieldPropType,
  FormInstancePropType,
  KeyNameOptionsPropType,
  KeyTitleOptionsPropType,
} from "../../../../utils/customPropTypes";
import EducationFormView from "./EducationFormView";

const EducationForm = ({
  form,
  fieldElement,
  removeElement,
  diplomaOptions,
  schoolOptions,
  attachmentNames,
}) => (
  <EducationFormView
    attachmentNames={attachmentNames}
    diplomaOptions={diplomaOptions}
    fieldElement={fieldElement}
    form={form}
    removeElement={removeElement}
    schoolOptions={schoolOptions}
  />
);

EducationForm.propTypes = {
  attachmentNames: KeyNameOptionsPropType.isRequired,
  diplomaOptions: KeyTitleOptionsPropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  form: FormInstancePropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  schoolOptions: KeyTitleOptionsPropType.isRequired,
};

export default EducationForm;
