import { useMemo } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import CompetenciesCardView from "./CompetenciesCardView";

/**
 * Format the competencies
 * @param {Object[]} competencies - start date
 * @param {string} competencies[].id - unique id of competency
 * @param {string} competencies[].name.name - name of the competency
 * @returns {Array<{ key: string, label: string}>} - formatted competencies
 */
const formatCompetencies = (competencies) =>
  competencies &&
  competencies.map((competency) => ({
    key: competency.id,
    label: competency.name,
  }));

const CompetenciesCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formattedCompetencies = useMemo(
    () => formatCompetencies(data.competencies),
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
