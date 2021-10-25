import { useMemo } from "react";
import { useIntl } from "react-intl";
import { LinkOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import LearningDevelopmentCardView from "./LearningDevelopmentCardView";

const LearningDevelopmentCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formattedDevelopmentalGoals = useMemo(
    () =>
      data.developmentalGoals &&
      data.developmentalGoals.map((goal) => ({
        key: goal.id,
        label: goal.name,
      })),
    [data.developmentalGoals]
  );

  const formattedSupportedDocuments = useMemo(
    () =>
      data.developmentalGoalsAttachments &&
      data.developmentalGoalsAttachments.map((document) => ({
        href: document.url,
        icon: <LinkOutlined />,
        key: document.id,
        label: document.name.name,
      })),
    [data.developmentalGoalsAttachments]
  );

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
      <LearningDevelopmentCardView
        devAttachments={formattedSupportedDocuments}
        devGoals={formattedDevelopmentalGoals}
      />
    </ProfileCards>
  );
};

LearningDevelopmentCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

LearningDevelopmentCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default LearningDevelopmentCard;
