import React from "react";
import { useSelector } from "react-redux";
import TalentManagementView from "./TalentManagementView";
import { ProfileInfoPropType } from "../../customPropTypes";

const TalentManagement = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  return <TalentManagementView data={data} locale={locale} />;
};

TalentManagement.propTypes = {
  data: ProfileInfoPropType,
};

TalentManagement.defaultProps = {
  data: null,
};

export default TalentManagement;
