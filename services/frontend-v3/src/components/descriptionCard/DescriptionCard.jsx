import React from "react";
import PropTypes from "prop-types";
import ProfileCards from "../profileCards/ProfileCards";
import DescriptionCardView from "./DescriptionCardView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const DescriptionCard = ({ data, type }) => {
  return (
    <ProfileCards
      titleId="profile.description"
      cardName="description"
      content={<DescriptionCardView data={data} />}
      id="card-profile-description"
      editUrl="/profile/edit/employment"
      data={data}
      type={type}
      visible={data.visibleCards.description}
    />
  );
};

DescriptionCard.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

DescriptionCard.defaultProps = {
  data: null,
  type: null,
};

export default DescriptionCard;
