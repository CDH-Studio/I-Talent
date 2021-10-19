import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import EmploymentStatusView from "./EmploymentStatusView";

const EmploymentStatus = ({ data, editableCardBool }) => {
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
      <EmploymentStatusView data={data} />
    </ProfileCards>
  );
};

EmploymentStatus.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

EmploymentStatus.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default EmploymentStatus;
