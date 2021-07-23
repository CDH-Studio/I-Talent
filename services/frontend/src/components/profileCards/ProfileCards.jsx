import PropTypes from "prop-types";
import ProfileCardsView from "./ProfileCardsView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

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
    titleString={titleString}
    editUrl={editUrl}
    cardName={cardName}
    id={id}
    editableCardBool={editableCardBool}
    visibility={visibility}
    visibleCards={data.visibleCards}
    lastUpdated={lastUpdated}
    displayExtraHeaderContent={displayExtraHeaderContent}
  >
    {visibility ? children : null}
  </ProfileCardsView>
);

ProfileCards.propTypes = {
  data: ProfileInfoPropType,
  titleString: PropTypes.string.isRequired,
  children: PropTypes.element,
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
  children: null,
  editUrl: null,
  editableCardBool: false,
  displayExtraHeaderContent: true,
  visibility: null,
  lastUpdated: null,
};

export default ProfileCards;
