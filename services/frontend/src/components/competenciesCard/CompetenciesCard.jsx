import { useMemo } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import CompetenciesCardView from "./CompetenciesCardView";

const CompetenciesCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formattedCompetencies = useMemo(
    () =>
      data.competencies &&
      data.competencies.map((competency) => ({
        key: competency.id,
        label: competency.name,
      })),
    [data.competencies]
  );

  return (
    <ProfileCards
      cardName="competencies"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/talent?tab=competencies"
      id="card-profile-competency"
      lastUpdated={data.competenciesUpdatedAt}
      titleString={intl.formatMessage({ id: "competencies" })}
      visibility={data.visibleCards.competencies}
    >
      <CompetenciesCardView competencies={formattedCompetencies} />
    </ProfileCards>
  );
};

CompetenciesCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

CompetenciesCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default CompetenciesCard;
