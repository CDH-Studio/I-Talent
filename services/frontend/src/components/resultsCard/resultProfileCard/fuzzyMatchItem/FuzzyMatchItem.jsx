import PropTypes from "prop-types";
import FuzzyMatchItemView from "./FuzzyMatchItemView";

const FuzzyMatchItem = ({ matchItemName, matchItemString }) => {
  return (
    <FuzzyMatchItemView
      matchItemName={matchItemName}
      matchItemString={matchItemString}
    />
  );
};

FuzzyMatchItem.propTypes = {
  matchItemName: PropTypes.string.isRequired,
  matchItemString: PropTypes.string.isRequired,
};

export default FuzzyMatchItem;
