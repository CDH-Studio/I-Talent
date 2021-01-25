import PropTypes from "prop-types";
import TalentManagementView from "./TalentManagementView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const TalentManagement = ({ data, editableCardBool }) => (
  <ProfileCards
    titleId="talent.management"
    cardName="talentManagement"
    id="card-profile-talent-management"
    editUrl="/profile/edit/career-management?tab=talent-management"
    data={data}
    editableCardBool={editableCardBool}
    visibility={data.visibleCards.talentManagement}
  >
    <TalentManagementView data={data} />
  </ProfileCards>
);

TalentManagement.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

TalentManagement.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default TalentManagement;
