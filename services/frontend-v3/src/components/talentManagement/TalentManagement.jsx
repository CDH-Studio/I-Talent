import React from "react";
import PropTypes from "prop-types";
import TalentManagementView from "./TalentManagementView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const TalentManagement = ({ data, editableCardBool }) => {
  return (
    <ProfileCards
      titleId="profile.talent.management"
      content={<TalentManagementView data={data} />}
      cardName="talentManagement"
      id="card-profile-talent-management"
      editUrl="/profile/edit/personal-growth?tab=talent-management"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.talentManagement}
    />
  );
};

TalentManagement.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

TalentManagement.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default TalentManagement;
