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
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  diplomaOptions: KeyTitleOptionsPropType.isRequired,
  schoolOptions: KeyTitleOptionsPropType.isRequired,
  attachmentNames: KeyNameOptionsPropType.isRequired,
};

export default EducationForm;
