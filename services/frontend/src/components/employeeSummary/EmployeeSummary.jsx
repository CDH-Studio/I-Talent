import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import EmployeeSummaryView from "./EmployeeSummaryView";

const EmployeeSummary = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCards
      cardName="info"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/employment"
      id="card-profile-employee-summary"
      titleString={intl.formatMessage({ id: "employment.status" })}
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
