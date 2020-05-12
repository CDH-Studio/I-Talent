import React from "react";
import PropTypes from "prop-types";
import EmployeeSummaryView from "./EmployeeSummaryView";

const EmployeeSummary = ({ data }) => {
  return <EmployeeSummaryView data={data} />;
};

EmployeeSummary.propTypes = {
  data: PropTypes.isRequired,
};

export default EmployeeSummary;
