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
  editableCardBool,
  displayExtraHeaderContent,
  visibility,
  lastUpdated,
}) => (
  <ProfileCardsView
    titleId={titleId}
    content={visibility ? content : null}
    editUrl={editUrl}
    cardName={cardName}
    id={id}
    editableCardBool={editableCardBool}
    visibility={visibility}
    visibleCards={data.visibleCards}
    lastUpdated={lastUpdated}
    displayExtraHeaderContent={displayExtraHeaderContent}
  />
);

ProfileCards.propTypes = {
  data: ProfileInfoPropType,
  titleId: PropTypes.node.isRequired,
  content: PropTypes.element,
  editUrl: PropTypes.string,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  editableCardBool: PropTypes.bool,
  displayExtraHeaderContent: PropTypes.bool,
  visibility: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]),
  ]),
  lastUpdated: PropTypes.string,
};

ProfileCards.defaultProps = {
  data: null,
  content: null,
  editUrl: null,
  editableCardBool: false,
  displayExtraHeaderContent: true,
  visibility: null,
  lastUpdated: null,
};

export default ProfileCards;
