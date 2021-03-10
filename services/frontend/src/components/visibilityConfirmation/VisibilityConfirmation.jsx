import PropTypes from "prop-types";
import VisibilityConfirmationView from "./VisibilityConfirmationView";

const VisibilityConfirmation = ({ visibleCards, visible, onOk }) => {
  console.log("VISIBLE CARD", visibleCards);

  return (
    <VisibilityConfirmationView
      visibleCards={visibleCards}
      onOk={onOk}
      visible={visible}
    />
  );
};

VisibilityConfirmation.propTypes = {
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
};

// VisibilityConfirmation.defaultProps = {
//   visibleCards: null,
// };

export default VisibilityConfirmation;
