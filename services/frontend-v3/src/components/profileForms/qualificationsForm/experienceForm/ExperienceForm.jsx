import React from "react";
import PropTypes from "prop-types";
import ExperienceFormView from "./ExperienceFormView";

import {
  FieldPropType,
  FormInstancePropType,
  ProfileInfoPropType,
} from "../../../../utils/customPropTypes";

/**
 *  ExperienceForm(props)
 *  Controller for the ExperienceFormView.
 *  This component is strongly linked ot Qualifications Form.
 *  It generated the form fields for each experience item the user creates in the qualifications form.
 */
const ExperienceForm = ({
  form,
  field,
  remove,
  profileInfo,
  checkIfFormValuesChanged,
}) => {
  return (
    <ExperienceFormView
      form={form}
      field={field}
      remove={remove}
      profileInfo={profileInfo}
      checkIfFormValuesChanged={checkIfFormValuesChanged}
    />
  );
};

ExperienceForm.propTypes = {
  form: FormInstancePropType.isRequired,
  field: FieldPropType.isRequired,
  remove: PropTypes.func.isRequired,
  profileInfo: ProfileInfoPropType.isRequired,
  checkIfFormValuesChanged: PropTypes.func.isRequired,
};

export default ExperienceForm;
