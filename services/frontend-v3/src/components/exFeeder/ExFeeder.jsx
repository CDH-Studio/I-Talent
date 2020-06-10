import React from "react";
import ExFeederView from "./ExFeederView";
import { ProfileInfoPropType } from "../../customPropTypes";

const ExFeeder = ({ data }) => {
  return <ExFeederView data={data} />;
};
ExFeeder.propTypes = {
  data: ProfileInfoPropType,
};

ExFeeder.defaultProps = {
  data: null,
};

export default ExFeeder;
