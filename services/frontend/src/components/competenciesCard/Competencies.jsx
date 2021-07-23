import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import ProfileCards from "../profileCards/ProfileCards";
import CompetenciesView from "./CompetenciesView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const Competencies = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCards
      titleString={intl.formatMessage({ id: "competencies" })}
      cardName="competencies"
      id="card-profile-competency"
      editUrl="/profile/edit/talent?tab=competencies"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.competencies}
      lastUpdated={data.competenciesUpdatedAt}
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
