import PropTypes from "prop-types";
import CardVisibilityStatusView from "./CardVisibilityStatusView";

const CardVisibilityStatus = ({ visibilityStatus }) => {
  return <CardVisibilityStatusView visibilityStatus={visibilityStatus} />;
};

CardVisibilityStatus.propTypes = {
  visibilityStatus: PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
    .isRequired,
};

export default CardVisibilityStatus;
