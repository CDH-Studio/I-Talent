import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import LearningDevelopmentView from "./LearningDevelopmentView";

const LearningDevelopment = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCards
      cardName="developmentalGoals"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/career-management?tab=learning-development"
      id="card-profile-learning-development"
      lastUpdated={data.developmentalGoalsUpdatedAt}
      titleString={intl.formatMessage({ id: "learning.development" })}
      visibility={data.visibleCards.developmentalGoals}
    >
      <LearningDevelopmentView
        devAttachments={data.developmentalGoalsAttachments}
        devGoals={data.developmentalGoals}
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
