import React from "react";
import EmployeeSummaryView from "./EmployeeSummaryView";

function EmployeeSummary(props) {
  return <EmployeeSummaryView data={props.data} />;
}

export default EmployeeSummary;
