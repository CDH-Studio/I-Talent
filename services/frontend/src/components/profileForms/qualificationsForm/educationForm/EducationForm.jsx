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
  savedEducation,
  diplomaOptions,
  schoolOptions,
  attachmentNames,
}) => {
  return (
    <EducationFormView
      form={form}
      fieldElement={fieldElement}
      removeElement={removeElement}
      savedEducation={savedEducation}
      diplomaOptions={diplomaOptions}
      schoolOptions={schoolOptions}
      attachmentNames={attachmentNames}
    />
  );
};

EducationForm.propTypes = {
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  savedEducation: PropTypes.arrayOf(
    PropTypes.shape({
      diploma: PropTypes.string,
      endDate: PropTypes.oneOfType([PropTypes.object]),
      startDate: PropTypes.oneOfType([PropTypes.object]),
      school: PropTypes.string,
    })
  ).isRequired,
  diplomaOptions: KeyTitleOptionsPropType.isRequired,
  schoolOptions: KeyTitleOptionsPropType.isRequired,
  attachmentNames: KeyNameOptionsPropType.isRequired,
};

export default EducationForm;
