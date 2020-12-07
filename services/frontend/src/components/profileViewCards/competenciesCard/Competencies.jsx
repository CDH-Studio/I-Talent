import PropTypes from "prop-types";
import ProfileCards from "../profileCards/ProfileCards";
import CompetenciesView from "./CompetenciesView";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";

const Competencies = ({ data, editableCardBool }) => (
  <ProfileCards
    titleId="profile.competencies"
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

Competencies.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

Competencies.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default Competencies;
