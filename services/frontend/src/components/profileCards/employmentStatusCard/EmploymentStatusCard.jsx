import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ProfileCardWrapper from "../profileCardWrapper/ProfileCardWrapper";
import EmploymentStatusCardView from "./EmploymentStatusCardView";

const EmploymentStatus = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCardWrapper
      cardName="info"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/employment"
      id="card-profile-employee-summary"
      titleString={intl.formatMessage({ id: "employment.status" })}
      visibility={data.visibleCards.info}
    >
      <EmploymentStatusCardView data={data} />
    </ProfileCardWrapper>
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
