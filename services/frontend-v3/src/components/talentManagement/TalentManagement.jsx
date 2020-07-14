import React from "react";
import PropTypes from "prop-types";
import TalentManagementView from "./TalentManagementView";
import { ProfileInfoPropType } from "../../customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const TalentManagement = ({
  data,
  title,
  cardName,
  id,
  type,
  visible,
  editUrl,
}) => {
  return (
    <ProfileCards
      title={title}
      content={<TalentManagementView data={data} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={visible}
    />
  );
};

TalentManagement.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
  editUrl: PropTypes.string,
};

TalentManagement.defaultProps = {
  data: null,
  type: null,
  visible: null,
  editUrl: "",
};

export default TalentManagement;
