import React from "react";
import PropTypes from "prop-types";
import ProfileCards from "../profileCards/ProfileCards";
import DescriptionCardView from "./DescriptionCardView";
import { ProfileInfoPropType } from "../../customPropTypes";

const DescriptionCard = ({ data, type }) => {
  return (
    <ProfileCards
      titleId="profile.description"
      cardName="DescriptionCard"
      content={<DescriptionCardView data={data} />}
      id="card-profile-competency"
      editUrl="/secured/profile/edit/talent"
      data={data}
      type={type}
      visible={data.visibleCards.competencies}
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
