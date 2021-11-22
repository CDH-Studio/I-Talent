import PropTypes from "prop-types";

import {
  FieldPropType,
  KeyNameOptionsPropType,
} from "../../../utils/customPropTypes";
import LinkAttachmentView from "./LinkAttachmentView";

const LinkAttachment = ({
  fieldElement,
  removeElement,
  attachmentNamesOptions,
  attachmentNameDefault,
  typeLabelName,
}) => (
  <LinkAttachmentView
    attachmentNameDefault={attachmentNameDefault}
    attachmentNamesOptions={attachmentNamesOptions}
    fieldElement={fieldElement}
    removeElement={removeElement}
    typeLabelName={typeLabelName}
  />
);

LinkAttachment.propTypes = {
  attachmentNameDefault: PropTypes.string.isRequired,
  attachmentNamesOptions: KeyNameOptionsPropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  typeLabelName: PropTypes.string,
};

LinkAttachment.defaultProps = {
  typeLabelName: undefined,
}

export default LinkAttachment;
