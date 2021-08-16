import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ResultProfileCardView from "./ResultProfileCardView";

const ResultProfileCard = ({
  profile,
  key,
  isConnection,
  loggedInUserId,
  addConnection,
  removeConnection,
}) => (
  <ResultProfileCardView
    key={key}
    addConnection={addConnection}
    isConnection={isConnection}
    loggedInUserId={loggedInUserId}
    profile={profile}
    removeConnection={removeConnection}
  />
);

ResultProfileCard.propTypes = {
  addConnection: PropTypes.func.isRequired,
  isConnection: PropTypes.bool.isRequired,
  key: PropTypes.string.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  profile: ProfileInfoPropType.isRequired,
  removeConnection: PropTypes.func.isRequired,
};

export default ResultProfileCard;
