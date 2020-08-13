import React from "react";
import PropTypes from "prop-types";
import LinkAttachmentView from "./LinkAttachmentView";
import {
  FieldPropType,
  FormInstancePropType,
  ProfileInfoPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";

const LinkAttachment = ({
  formElement,
  fieldElement,
  removeElement,
  profileInfo,
  NameOptions,
}) => {
  return (
    <LinkAttachmentView
      formElement={formElement}
      fieldElement={fieldElement}
      removeElement={removeElement}
      profileInfo={profileInfo}
      NameOptions={NameOptions}
    />
  );
};

LinkAttachment.propTypes = {
  formElement: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  profileInfo: ProfileInfoPropType.isRequired,
  NameOptions: KeyNameOptionsPropType.isRequired,
};

export default LinkAttachment;
