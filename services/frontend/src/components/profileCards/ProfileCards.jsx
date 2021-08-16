import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCardsView from "./ProfileCardsView";

const ProfileCards = ({
  data,
  titleString,
  children,
  editUrl,
  cardName,
  id,
  editableCardBool,
  displayExtraHeaderContent,
  visibility,
  lastUpdated,
}) => (
  <ProfileCardsView
    cardName={cardName}
    displayExtraHeaderContent={displayExtraHeaderContent}
    editableCardBool={editableCardBool}
    editUrl={editUrl}
    id={id}
    lastUpdated={lastUpdated}
    titleString={titleString}
    visibility={visibility}
    visibleCards={data.visibleCards}
  >
    {visibility ? children : null}
  </ProfileCardsView>
);

ProfileCards.propTypes = {
  cardName: PropTypes.string.isRequired,
  children: PropTypes.element,
  data: ProfileInfoPropType,
  displayExtraHeaderContent: PropTypes.bool,
  editUrl: PropTypes.string,
  editableCardBool: PropTypes.bool,
  id: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string,
  titleString: PropTypes.string.isRequired,
  visibility: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]),
  ]),
};

ProfileCards.defaultProps = {
  children: null,
  data: null,
  displayExtraHeaderContent: true,
  editUrl: null,
  editableCardBool: false,
  lastUpdated: null,
  visibility: null,
};

export default ProfileCards;
