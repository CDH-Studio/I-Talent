import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import ProfileCards from "../profileCards/ProfileCards";
import CompetenciesView from "./CompetenciesView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const Competencies = ({ data, editableCardBool }) => {
  const intl = useIntl();

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
      <CompetenciesView competencies={data.competencies} />
    </ProfileCards>
  );
};

Competencies.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

Competencies.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default Competencies;
