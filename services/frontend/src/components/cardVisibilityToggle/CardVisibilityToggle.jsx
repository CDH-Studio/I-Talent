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
  ariaLabel: PropTypes.string,
  cardName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["form", "card"]),
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
};

CardVisibilityToggle.defaultProps = {
  ariaLabel: "",
  type: "card",
};

export default CardVisibilityToggle;
