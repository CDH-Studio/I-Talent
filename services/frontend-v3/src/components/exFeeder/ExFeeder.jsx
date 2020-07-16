import React from "react";
import PropTypes from "prop-types";
import ExFeederView from "./ExFeederView";
import { ProfileInfoPropType } from "../../customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const ExFeeder = ({ data, cardName, id, type, editUrl }) => {
  return (
    <ProfileCards
      title={<ExFeederView data={data} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={data.visibleCards.exFeeder}
    />
  );
};
ExFeeder.propTypes = {
  data: ProfileInfoPropType,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  editUrl: PropTypes.string,
};

ExFeeder.defaultProps = {
  data: null,
  type: null,
  editUrl: "",
};

export default ExFeeder;
