import PropTypes from "prop-types";
import VisibilityConfirmationView from "./VisibilityConfirmationView";

const VisibilityConfirmation = ({
  visibleCards,
  visible,
  onOk,
  onCloseModal,
}) => (
  <VisibilityConfirmationView
    visibleCards={visibleCards}
    onOk={onOk}
    visible={visible}
    onCloseModal={onCloseModal}
  />
);

VisibilityConfirmation.propTypes = {
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func,
  onCloseModal: PropTypes.func.isRequired,
};

VisibilityConfirmation.defaultProps = {
  onOk: () => {},
};

export default VisibilityConfirmation;
