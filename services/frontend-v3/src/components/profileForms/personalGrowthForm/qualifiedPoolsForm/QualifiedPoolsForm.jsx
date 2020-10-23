import React from "react";
import PropTypes from "prop-types";
import QualifiedPoolsFormView from "./QualifiedPoolsFormView";
import {
  FieldPropType,
  FormInstancePropType,
  KeyTitleOptionsPropType,
} from "../../../../utils/customPropTypes";

const QualifiedPoolsForm = ({
  form,
  fieldElement,
  removeElement,
  savedQualifiedPools,
  classificationOptions,
}) => {
  return (
    <QualifiedPoolsFormView
      form={form}
      fieldElement={fieldElement}
      removeElement={removeElement}
      savedQualifiedPools={savedQualifiedPools}
      classificationOptions={classificationOptions}
    />
  );
};

QualifiedPoolsForm.propTypes = {
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  savedQualifiedPools: PropTypes.arrayOf(
    PropTypes.shape({
      jobTitle: PropTypes.string,
      selectionProcessNumber: PropTypes.string,
      jobPosterLink: PropTypes.string,
    })
  ).isRequired,
  classificationOptions: KeyTitleOptionsPropType.isRequired,
};

export default QualifiedPoolsForm;
