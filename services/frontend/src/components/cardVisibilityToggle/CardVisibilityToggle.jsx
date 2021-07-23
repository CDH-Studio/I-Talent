import PropTypes from "prop-types";
import CardVisibilityToggleView from "./CardVisibilityToggleView";

const CardVisibilityToggle = ({ visibleCards, cardName, type, ariaLabel }) => (
  <CardVisibilityToggleView
    cardName={cardName}
    type={type}
    visibleCards={visibleCards}
    ariaLabel={ariaLabel}
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
