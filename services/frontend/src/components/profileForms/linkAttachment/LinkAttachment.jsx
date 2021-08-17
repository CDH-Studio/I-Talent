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
}) => (
  <LinkAttachmentView
    attachmentNameDefault={attachmentNameDefault}
    attachmentNamesOptions={attachmentNamesOptions}
    fieldElement={fieldElement}
    removeElement={removeElement}
  />
);

LinkAttachment.propTypes = {
  attachmentNameDefault: PropTypes.string.isRequired,
  attachmentNamesOptions: KeyNameOptionsPropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
};

export default LinkAttachment;
