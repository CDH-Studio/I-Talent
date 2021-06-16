import PropTypes from "prop-types";
import VisibilityConfirmationView from "./VisibilityConfirmationView";

const VisibilityConfirmation = ({
  visibleCards,
  visible,
  onOk,
  onCloseDrawer,
}) => (
  <VisibilityConfirmationView
    visibleCards={visibleCards}
    onOk={onOk}
    visible={visible}
    onCloseDrawer={onCloseDrawer}
  />
);

VisibilityConfirmation.propTypes = {
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func,
  onCloseDrawer: PropTypes.func.isRequired,
};

VisibilityConfirmation.defaultProps = {
  onOk: () => {},
};

export default VisibilityConfirmation;
