import React from "react";
import PropTypes from "prop-types";
import ProfileCards from "../profileCards/ProfileCards";
import DescriptionCardView from "./DescriptionCardView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const DescriptionCard = ({ data, editableCardBool }) => {
  return (
    <ProfileCards
      titleId="profile.description"
      cardName="description"
      content={<DescriptionCardView data={data.description} />}
      id="card-profile-description"
      editUrl="/profile/edit/employment"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.description}
    />
  );
};

DescriptionCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

DescriptionCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default DescriptionCard;
