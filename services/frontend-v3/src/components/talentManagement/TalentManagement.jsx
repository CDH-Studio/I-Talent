import React from "react";
import TalentManagementView from "./TalentManagementView";
import { FormattedMessage } from "react-intl";

function TalentManagement(props) {
  const data = props.data;

  const getTalentManagementInfo = (dataSource) => {
    const locale = localStorage.getItem("lang") || "en";
    const careerMobility = {
      title: <FormattedMessage id="profile.career.mobility" />,
      description: dataSource.careerMobility.description[locale] || (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const talentMatrixResult = {
      title: <FormattedMessage id="profile.talent.matrix.result" />,
      description: dataSource.talentMatrixResult.description[locale] || (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    return [careerMobility, talentMatrixResult];
  };

  return (
    <TalentManagementView
      data={data}
      locale={localStorage.getItem("lang") || "en"}
      info={getTalentManagementInfo(data)}
    />
  );
}

export default TalentManagement;
