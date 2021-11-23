import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../../../utils/customPropTypes";
import AllProfileCardsView from "./AllProfileCardsView";

const AllProfileCards = ({ isConnection, isOwnersProfile, profileData }) => (
  <AllProfileCardsView
    isConnection={isConnection}
    isOwnersProfile={isOwnersProfile}
    profileData={profileData}
  />
);

AllProfileCards.propTypes = {
  isConnection: PropTypes.bool,
  isOwnersProfile: PropTypes.bool,
  profileData: ProfileInfoPropType.isRequired,
};

AllProfileCards.defaultProps = {
  isConnection: false,
  isOwnersProfile: false,
};

export default AllProfileCards;
