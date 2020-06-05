import React from "react";
import { useSelector } from "react-redux";
import ExFeederView from "./ExFeederView";
import { ProfileInfoPropType } from "../../customPropTypes";

const ExFeeder = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  return <ExFeederView data={data} locale={locale} />;
};
ExFeeder.propTypes = {
  data: ProfileInfoPropType,
};

ExFeeder.defaultProps = {
  data: null,
};

export default ExFeeder;
