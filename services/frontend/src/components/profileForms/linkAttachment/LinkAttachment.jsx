import PropTypes from "prop-types";
import LinkAttachmentView from "./LinkAttachmentView";
import {
  FieldPropType,
  KeyNameOptionsPropType,
} from "../../../utils/customPropTypes";

const LinkAttachment = ({
  fieldElement,
  removeElement,
  attachmentNamesOptions,
  attachmentNameDefault,
}) => (
  <LinkAttachmentView
    attachmentNameDefault={attachmentNameDefault}
    attachmentNamesOptions={attachmentNamesOptions}
    fieldElement={fieldElement}
    removeElement={removeElement}
  />
);

LinkAttachment.propTypes = {
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  attachmentNamesOptions: KeyNameOptionsPropType.isRequired,
  attachmentNameDefault: PropTypes.string.isRequired,
};

export default LinkAttachment;
