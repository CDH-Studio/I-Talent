import React from "react";
import PropTypes from "prop-types";
import LinkAttachmentView from "./LinkAttachmentView";
import {
  FieldPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";

const LinkAttachment = ({ fieldElement, removeElement, nameOptions }) => {
  return (
    <LinkAttachmentView
      fieldElement={fieldElement}
      removeElement={removeElement}
      nameOptions={nameOptions}
    />
  );
};

LinkAttachment.propTypes = {
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  nameOptions: KeyNameOptionsPropType.isRequired,
};

export default LinkAttachment;
