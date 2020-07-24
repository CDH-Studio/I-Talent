import React from "react";
import PropTypes from "prop-types";
import ProfileCardsView from "./ProfileCardsView";
import { ProfileInfoPropType } from "../../customPropTypes";

const ProfileCards = ({
  data,
  titleId,
  content,
  editUrl,
  cardName,
  id,
  type,
  visible,
}) => (
  <ProfileCardsView
    titleId={titleId}
    content={content}
    editUrl={editUrl}
    cardName={cardName}
    id={id}
    type={type}
    visible={visible}
    visibleCards={data.visibleCards}
  />
);

ProfileCards.propTypes = {
  data: ProfileInfoPropType,
  titleId: PropTypes.node.isRequired,
  content: PropTypes.element,
  editUrl: PropTypes.string,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
};

ProfileCards.defaultProps = {
  data: null,
  content: null,
  editUrl: null,
  type: null,
  visible: null,
};

export default ProfileCards;
