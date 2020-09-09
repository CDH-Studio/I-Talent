import React from "react";
import PropTypes from "prop-types";
import EmployeeSummaryView from "./EmployeeSummaryView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const EmployeeSummary = ({ data, editableCardBool }) => {
  return (
    <ProfileCards
      titleId="profile.employee.status"
      content={<EmployeeSummaryView data={data} />}
      cardName="info"
      id="card-profile-employee-summary"
      editUrl="/profile/edit/employment"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.info}
    />
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
