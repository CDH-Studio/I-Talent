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
    classificationOptions={classificationOptions}
    fieldElement={fieldElement}
    form={form}
    removeElement={removeElement}
    savedQualifiedPools={savedQualifiedPools}
  />
);

QualifiedPoolsForm.propTypes = {
  classificationOptions: KeyTitleOptionsPropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  form: FormInstancePropType.isRequired,
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
