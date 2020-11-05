import React from "react";
import PropTypes from "prop-types";
import FormTitleView from "./FormTitleView";

const FormTitle = ({ title, formType, stepNumber, fieldsChanged }) => (
  <FormTitleView
    title={title}
    formType={formType}
    stepNumber={stepNumber}
    fieldsChanged={fieldsChanged}
  />
);

FormTitle.propTypes = {
  title: PropTypes.node.isRequired,
  formType: PropTypes.oneOf(["create", "edit"]).required,
  stepNumber: PropTypes.number,
  fieldsChanged: PropTypes.boolean,
};

export default FormTitle;
