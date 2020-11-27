import PropTypes from "prop-types";
// import { useHistory } from "react-router-dom";
// import { map } from "lodash";
import ResultProfileCardView from "./ResultProfileCardView";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";
// import handleError from "../../../functions/handleError";
// import useAxios from "../../../utils/useAxios";

const ResultProfileCard = ({
  profile,
  key,
  isConnection,
  loggedInUserId,
  addConnection,
  removeConnection,
  // getConnections,
}) => {
  // const axios = useAxios();
  // const history = useHistory();

  // const addConnection = async (urlID) => {
  //   await axios
  //     .post(`api/connections/${urlID}`)
  //     .catch((error) => handleError(error, "message", history));
  //   getConnections();
  // };

  // const removeConnection = async (urlID) => {
  //   await axios
  //     .delete(`api/connections/${urlID}`)
  //     .catch((error) => handleError(error, "message", history));
  //   getConnections();
  // };
  // console.log("ResultProfileCard", profile);
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
  // getConnections: PropTypes.func.isRequired,
};

export default ResultProfileCard;
