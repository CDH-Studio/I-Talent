import PropTypes from "prop-types";

import FriendshipRibbonView from "./FriendshipRibbonView";

const FriendshipRibbon = ({
  changeConnection,
  children,
  isConnection,
  loggedInUserId,
  userId,
}) => (
  <FriendshipRibbonView
    changeConnection={changeConnection}
    isConnection={isConnection}
    loggedInUserId={loggedInUserId}
    userId={userId}
  >
    {children}
  </FriendshipRibbonView>
);

FriendshipRibbon.propTypes = {
  changeConnection: PropTypes.func.isRequired,
  children: PropTypes.element,
  isConnection: PropTypes.bool.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

FriendshipRibbon.defaultProps = {
  children: null,
};

export default FriendshipRibbon;
