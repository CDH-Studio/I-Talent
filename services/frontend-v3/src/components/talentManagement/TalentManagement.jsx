import React from "react";
import PropTypes from "prop-types";
import TalentManagementView from "./TalentManagementView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const TalentManagement = ({ data, type }) => {
  return (
    <ProfileCards
      titleId="profile.talent.management"
      content={<TalentManagementView data={data} />}
      cardName="talentManagement"
      id="card-profile-talent-management"
      editUrl="/profile/edit/personal-growth"
      data={data}
      type={type}
      visible={data.visibleCards.talentManagement}
    />
  );
};

TalentManagement.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

TalentManagement.defaultProps = {
  data: null,
  type: null,
};

export default TalentManagement;
