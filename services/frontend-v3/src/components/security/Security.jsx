import React from "react";
import SecurityView from "./SecurityView";
import { ProfileInfoPropType } from "../../customPropTypes";

const ExFeeder = ({ data }) => {
  return <SecurityView data={data} />;
};

ExFeeder.propTypes = {
  data: ProfileInfoPropType,
};

ExFeeder.defaultProps = {
  data: null,
};

export default ExFeeder;
