import React from "react";
import PropTypes from "prop-types";
import ProfileCardsView from "./ProfileCardsView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const ProfileCards = ({
  data,
  titleId,
  content,
  editUrl,
  cardName,
  id,
  type,
  visible,
  lastUpdated,
}) => (
  <ProfileCardsView
    titleId={titleId}
    content={false ? content : null}
    editUrl={editUrl}
    cardName={cardName}
    id={id}
    type={type}
    visible={false}
    visibleCards={data.visibleCards}
    lastUpdated={lastUpdated}
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
  lastUpdated: PropTypes.string,
};

ProfileCards.defaultProps = {
  data: null,
  content: null,
  editUrl: null,
  type: null,
  visible: null,
  lastUpdated: null,
};

export default ProfileCards;
