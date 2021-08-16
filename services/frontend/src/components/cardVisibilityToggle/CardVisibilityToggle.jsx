import PropTypes from "prop-types";
import CardVisibilityToggleView from "./CardVisibilityToggleView";

const CardVisibilityToggle = ({ visibleCards, cardName, type, ariaLabel }) => (
  <CardVisibilityToggleView
    ariaLabel={ariaLabel}
    cardName={cardName}
    type={type}
    visibleCards={visibleCards}
  />
);

CardVisibilityToggle.propTypes = {
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
  cardName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["form", "card"]),
  ariaLabel: PropTypes.string,
};

CardVisibilityToggle.defaultProps = {
  type: "card",
  ariaLabel: "",
};

export default CardVisibilityToggle;
