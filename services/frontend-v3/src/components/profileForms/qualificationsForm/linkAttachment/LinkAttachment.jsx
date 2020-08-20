import React from "react";
import PropTypes from "prop-types";
import LinkAttachmentView from "./LinkAttachmentView";
import {
  FieldPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";

const LinkAttachment = ({ fieldElement, removeElement, NameOptions }) => {
  return (
    <LinkAttachmentView
      fieldElement={fieldElement}
      removeElement={removeElement}
      NameOptions={NameOptions}
    />
  );
};

LinkAttachment.propTypes = {
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  NameOptions: KeyNameOptionsPropType.isRequired,
};

export default LinkAttachment;
