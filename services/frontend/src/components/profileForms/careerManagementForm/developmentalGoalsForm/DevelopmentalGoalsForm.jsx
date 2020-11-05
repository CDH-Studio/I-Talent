import React from "react";
import PropTypes from "prop-types";
import DevelopmentalGoalsFormView from "./DevelopmentalGoalsFormView";
import {
  FieldPropType,
  FormInstancePropType,
  KeyTitleOptionsPropType,
} from "../../../../utils/customPropTypes";

const DevelopmentalGoalsForm = ({
  form,
  fieldElement,
  removeElement,
  savedQualifiedPools,
  classificationOptions,
}) => {
  return (
    <DevelopmentalGoalsFormView
      form={form}
      fieldElement={fieldElement}
      removeElement={removeElement}
      savedQualifiedPools={savedQualifiedPools}
      classificationOptions={classificationOptions}
    />
  );
};

DevelopmentalGoalsForm.propTypes = {
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  savedQualifiedPools: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      classificationId: PropTypes.string,
      jobTitle: PropTypes.string,
      selectionProcessNumber: PropTypes.string,
      jobPosterLink: PropTypes.string,
    })
  ).isRequired,
  classificationOptions: KeyTitleOptionsPropType.isRequired,
};

export default DevelopmentalGoalsForm;
