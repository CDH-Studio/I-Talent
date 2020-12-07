import PropTypes from "prop-types";
import QualifiedPoolsFormView from "./QualifiedPoolsFormView";
import {
  FieldPropType,
  KeyTitleOptionsPropType,
} from "../../../../utils/customPropTypes";

const QualifiedPoolsForm = ({
  fieldElement,
  removeElement,
  savedQualifiedPools,
  classificationOptions,
}) => {
  return (
    <QualifiedPoolsFormView
      fieldElement={fieldElement}
      removeElement={removeElement}
      savedQualifiedPools={savedQualifiedPools}
      classificationOptions={classificationOptions}
    />
  );
};

QualifiedPoolsForm.propTypes = {
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
