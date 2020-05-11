import React from "react";
import PropTypes from "prop-types";
import TalentManagementView from "./TalentManagementView";

const TalentManagement = ({ data }) => {
  return (
    <TalentManagementView
      data={data}
      locale={localStorage.getItem("lang") || "en"}
    />
  );
};

TalentManagement.propTypes = {
  data: PropTypes.isRequired,
};

export default TalentManagement;
