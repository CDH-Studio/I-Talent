import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import LearningDevelopmentView from "./LearningDevelopmentView";

const LearningDevelopment = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCards
      titleString={intl.formatMessage({ id: "learning.development" })}
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
};

LearningDevelopment.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

LearningDevelopment.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default LearningDevelopment;
