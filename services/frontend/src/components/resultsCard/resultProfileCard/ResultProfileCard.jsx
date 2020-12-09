import PropTypes from "prop-types";
import ResultProfileCardView from "./ResultProfileCardView";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";

const ResultProfileCard = ({
  profile,
  key,
  isConnection,
  loggedInUserId,
  addConnection,
  removeConnection,
}) => {
  return (
    <ResultProfileCardView
      profile={profile}
      key={key}
      isConnection={isConnection}
      loggedInUserId={loggedInUserId}
      addConnection={addConnection}
      removeConnection={removeConnection}
    />
  );
};

ResultProfileCard.propTypes = {
  profile: ProfileInfoPropType.isRequired,
  key: PropTypes.string.isRequired,
  isConnection: PropTypes.bool.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  addConnection: PropTypes.func.isRequired,
  removeConnection: PropTypes.func.isRequired,
};

export default ResultProfileCard;
