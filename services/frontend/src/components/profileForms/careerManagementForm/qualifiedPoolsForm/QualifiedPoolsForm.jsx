import PropTypes from "prop-types";

import {
  FieldPropType,
  FormInstancePropType,
  KeyTitleOptionsPropType,
} from "../../../../utils/customPropTypes";
import QualifiedPoolsFormView from "./QualifiedPoolsFormView";

const QualifiedPoolsForm = ({
  form,
  fieldElement,
  removeElement,
  savedQualifiedPools,
  classificationOptions,
}) => (
  <QualifiedPoolsFormView
    form={form}
    classificationOptions={classificationOptions}
    fieldElement={fieldElement}
    removeElement={removeElement}
    savedQualifiedPools={savedQualifiedPools}
  />
);

QualifiedPoolsForm.propTypes = {
  form: FormInstancePropType.isRequired,
  classificationOptions: KeyTitleOptionsPropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  savedQualifiedPools: PropTypes.arrayOf(
    PropTypes.shape({
      classificationId: PropTypes.string,
      id: PropTypes.string,
      jobPosterLink: PropTypes.string,
      jobTitle: PropTypes.string,
      selectionProcessNumber: PropTypes.string,
    })
  ).isRequired,
};

export default QualifiedPoolsForm;
