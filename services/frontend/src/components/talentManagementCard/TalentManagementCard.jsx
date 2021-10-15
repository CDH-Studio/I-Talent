import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import TalentManagementView from "./TalentManagementCardView";

const TalentManagementCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCards
      cardName="talentManagement"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/career-management?tab=talent-management"
      id="card-profile-talent-management"
      titleString={intl.formatMessage({ id: "talent.management" })}
      visibility={data.visibleCards.talentManagement}
    >
      <TalentManagementView
        careerMobility={data.careerMobility}
        talentMatrixResult={data.talentMatrixResult}
      />
    </ProfileCards>
  );
};

TalentManagementCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

TalentManagementCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default TalentManagementCard;
