import PropTypes from "prop-types";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import LearningDevelopmentView from "./LearningDevelopmentView";

const LearningDevelopment = ({ data, editableCardBool }) => (
  <ProfileCards
    titleId="profile.learning.development"
    cardName="developmentalGoals"
    id="card-profile-learning-development"
    editUrl="/profile/edit/career-management?tab=learning-development"
    data={data}
    editableCardBool={editableCardBool}
    visibility={data.visibleCards.developmentalGoals}
    lastUpdated={data.developmentalGoalsUpdatedAt}
  >
    <LearningDevelopmentView
      devGoals={data.developmentalGoals}
      devAttachments={data.developmentalGoalsAttachments}
    />
  </ProfileCards>
);

LearningDevelopment.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

LearningDevelopment.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default LearningDevelopment;
