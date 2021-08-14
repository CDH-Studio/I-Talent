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
    fieldElement={fieldElement}
    removeElement={removeElement}
    attachmentNamesOptions={attachmentNamesOptions}
    attachmentNameDefault={attachmentNameDefault}
  />
);

LinkAttachment.propTypes = {
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  attachmentNamesOptions: KeyNameOptionsPropType.isRequired,
  attachmentNameDefault: PropTypes.string.isRequired,
};

export default LinkAttachment;
