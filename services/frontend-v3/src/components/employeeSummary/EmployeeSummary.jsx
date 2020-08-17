import React from "react";
import PropTypes from "prop-types";
import EmployeeSummaryView from "./EmployeeSummaryView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const EmployeeSummary = ({ data, type }) => {
  return (
    <ProfileCards
      titleId="profile.employee.status"
      content={<EmployeeSummaryView data={data} />}
      cardName="info"
      id="card-profile-employee-summary"
      editUrl="/profile/edit/employment"
      data={data}
      type={type}
      visible={data.visibleCards.info}
    />
  );
};

EmployeeSummary.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

EmployeeSummary.defaultProps = {
  data: null,
  type: null,
};

export default EmployeeSummary;
