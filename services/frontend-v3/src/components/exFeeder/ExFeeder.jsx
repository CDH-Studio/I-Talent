import React from "react";
import PropTypes from "prop-types";
import ExFeederView from "./ExFeederView";
import { ProfileInfoPropType } from "../../customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const ExFeeder = ({ data, type }) => {
  return (
    <ProfileCards
      titleId={<ExFeederView data={data} />}
      cardName="exFeeder"
      editUrl="/secured/profile/edit/personal-growth"
      id="card-profile-ex-feeder"
      data={data}
      type={type}
      visible={data.visibleCards.exFeeder}
    />
  );
};
ExFeeder.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

ExFeeder.defaultProps = {
  data: null,
  type: null,
};

export default ExFeeder;
