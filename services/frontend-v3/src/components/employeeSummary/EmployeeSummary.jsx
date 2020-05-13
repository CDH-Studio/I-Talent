import React from "react";
import EmployeeSummaryView from "./EmployeeSummaryView";
import { ProfileInfoPropType } from "../../customPropTypes";

const EmployeeSummary = ({ data }) => {
  return <EmployeeSummaryView data={data} />;
};

EmployeeSummary.propTypes = {
  data: ProfileInfoPropType,
};

EmployeeSummary.defaultProps = {
  data: null,
};

export default EmployeeSummary;
