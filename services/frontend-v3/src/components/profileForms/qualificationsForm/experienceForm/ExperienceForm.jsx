import React from "react";
import ExperienceFormView from "./ExperienceFormView";

/**
 *  ExperienceForm(props)
 *  Controller for the ExperienceFormView.
 *  This component is strongly linked ot Qualifications Form.
 *  It generated the form fields for each experience item the user creates in the qualifications form.
 */
const ExperienceForm = (props) => {
  return (
    <ExperienceFormView
      form={props.form}
      field={props.field}
      remove={props.remove}
      profileInfo={props.profileInfo}
      style={props.style}
    />
  );
};

export default ExperienceForm;
