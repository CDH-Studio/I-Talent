import PropTypes from "prop-types";
import QualifiedPoolsFormView from "./QualifiedPoolsFormView";
import {
  FormInstancePropType,
  FieldPropType,
  KeyTitleOptionsPropType,
} from "../../../../utils/customPropTypes";

const QualifiedPoolsForm = ({
  form,
  fieldElement,
  removeElement,
  savedQualifiedPools,
  classificationOptions,
}) => (
  <QualifiedPoolsFormView
    form={form}
    fieldElement={fieldElement}
    removeElement={removeElement}
    savedQualifiedPools={savedQualifiedPools}
    classificationOptions={classificationOptions}
  />
);

QualifiedPoolsForm.propTypes = {
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

export default QualifiedPoolsForm;
