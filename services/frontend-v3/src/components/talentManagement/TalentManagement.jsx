import React from "react";
import TalentManagementView from "./TalentManagementView";

function TalentManagement(props) {
  const { data } = props;

  return (
    <TalentManagementView
      data={data}
      locale={localStorage.getItem("lang") || "en"}
    />
  );
}

export default TalentManagement;
