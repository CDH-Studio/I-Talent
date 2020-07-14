import React from "react";
import PropTypes from "prop-types";
import ExFeederView from "./ExFeederView";
import { ProfileInfoPropType } from "../../customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const ExFeeder = ({ data, cardName, id, type, visible, editUrl }) => {
  return (
    <ProfileCards
      title={<ExFeederView data={data} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={visible}
    />
  );
};
ExFeeder.propTypes = {
  data: ProfileInfoPropType,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
  editUrl: PropTypes.string,
};

ExFeeder.defaultProps = {
  data: null,
  type: null,
  visible: null,
  editUrl: "",
};

export default ExFeeder;
