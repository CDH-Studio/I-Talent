import React from "react";
import TalentManagementView from "./TalentManagementView";

function TalentManagement(props) {
  const data = props.data;

  return (
    <TalentManagementView
      data={data}
      locale={localStorage.getItem("lang")}
    />
  );
}

export default TalentManagement;
