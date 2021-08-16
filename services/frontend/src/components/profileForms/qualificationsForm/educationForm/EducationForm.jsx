import PropTypes from "prop-types";
import EducationFormView from "./EducationFormView";
import {
  FieldPropType,
  FormInstancePropType,
  KeyTitleOptionsPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";

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
