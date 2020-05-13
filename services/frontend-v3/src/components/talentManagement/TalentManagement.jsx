import React from "react";
import TalentManagementView from "./TalentManagementView";
import { ProfileInfoPropType } from "../../customPropTypes";

const TalentManagement = ({ data }) => {
  return (
    <TalentManagementView
      data={data}
      locale={localStorage.getItem("lang") || "en"}
    />
  );
};

TalentManagement.propTypes = {
  data: ProfileInfoPropType,
};

TalentManagement.defaultProps = {
  data: null,
};

export default TalentManagement;
