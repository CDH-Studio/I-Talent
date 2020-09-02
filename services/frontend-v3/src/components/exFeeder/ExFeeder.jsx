import React from "react";
import PropTypes from "prop-types";
import ExFeederView from "./ExFeederView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const ExFeeder = ({ data, editableCardBool }) => {
  return (
    <ProfileCards
      titleId={<ExFeederView data={data} />}
      cardName="exFeeder"
      editUrl="/profile/edit/personal-growth?tab=ex-feeder"
      id="card-profile-ex-feeder"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.exFeeder}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.education}
    />
  );
};
ExFeeder.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

ExFeeder.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default ExFeeder;
