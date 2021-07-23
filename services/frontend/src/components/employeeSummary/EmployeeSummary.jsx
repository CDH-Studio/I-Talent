import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import EmployeeSummaryView from "./EmployeeSummaryView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const EmployeeSummary = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCards
      titleString={intl.formatMessage({ id: "employment.status" })}
      cardName="info"
      id="card-profile-employee-summary"
      editUrl="/profile/edit/employment"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.info}
    >
      <EmployeeSummaryView data={data} />
    </ProfileCards>
  );
};

EmployeeSummary.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

EmployeeSummary.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default EmployeeSummary;
