import React, { useState } from "react";
import PropTypes from "prop-types";
import ExperienceFormView from "./ExperienceFormView";
import {
  FieldPropType,
  FormInstancePropType,
  ProfileInfoPropType,
  StylesPropType,
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
  style,
  checkIfFormValuesChanged,
}) => {
  const [charsLeft, setCharsLeft] = useState(
    field &&
      field.key !== undefined &&
      profileInfo &&
      profileInfo.careerSummary &&
      profileInfo.careerSummary[field.key] &&
      profileInfo.careerSummary[field.key].content
      ? 1500 - profileInfo.careerSummary[field.key].content.length
      : 1500
  );

  const handleContentChange = (e) => {
    setCharsLeft(1500 - e.currentTarget.value.length);
  };

  return (
    <ExperienceFormView
      form={form}
      field={field}
      remove={remove}
      profileInfo={profileInfo}
      style={style}
      checkIfFormValuesChanged={checkIfFormValuesChanged}
      charsLeft={charsLeft}
      handleContentChange={handleContentChange}
    />
  );
};

ExperienceForm.propTypes = {
  form: FormInstancePropType.isRequired,
  field: FieldPropType.isRequired,
  remove: PropTypes.func.isRequired,
  profileInfo: ProfileInfoPropType.isRequired,
  style: StylesPropType.isRequired,
  checkIfFormValuesChanged: PropTypes.func.isRequired,
};

export default ExperienceForm;
