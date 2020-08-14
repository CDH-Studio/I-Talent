import React from "react";
import PropTypes from "prop-types";
import EducationFormView from "./EducationFormView";
import {
  FieldPropType,
  FormInstancePropType,
  ProfileInfoPropType,
  KeyTitleOptionsPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";

const EducationForm = ({
  form,
  fieldElement,
  removeElement,
  profileInfo,
  checkIfFormValuesChanged,
  diplomaOptions,
  schoolOptions,
  attachmentNamesTypeEduOptions,
}) => {
  return (
    <EducationFormView
      form={form}
      fieldElement={fieldElement}
      removeElement={removeElement}
      profileInfo={profileInfo}
      checkIfFormValuesChanged={checkIfFormValuesChanged}
      diplomaOptions={diplomaOptions}
      schoolOptions={schoolOptions}
      attachmentNamesTypeEduOptions={attachmentNamesTypeEduOptions}
    />
  );
};

EducationForm.propTypes = {
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  profileInfo: ProfileInfoPropType.isRequired,
  checkIfFormValuesChanged: PropTypes.func.isRequired,
  diplomaOptions: KeyTitleOptionsPropType.isRequired,
  schoolOptions: KeyTitleOptionsPropType.isRequired,
  attachmentNamesTypeEduOptions: KeyNameOptionsPropType.isRequired,
};

export default EducationForm;
