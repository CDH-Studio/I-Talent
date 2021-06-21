import PropTypes from "prop-types";
import CardVisibilityToggleView from "./CardVisibilityToggleView";

const CardVisibilityToggle = ({ visibleCards, cardName, type }) => (
  <CardVisibilityToggleView
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
};

CardVisibilityToggle.defaultProps = {
  type: "card",
};

export default CardVisibilityToggle;
