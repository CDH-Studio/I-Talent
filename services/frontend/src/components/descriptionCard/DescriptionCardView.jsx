import PropTypes from "prop-types";

import DescriptionText from "../descriptionText/DescriptionText";

const DescriptionCardView = ({ data }) => {
  return <DescriptionText text={data} />;
};

DescriptionCardView.propTypes = {
  data: PropTypes.string,
};

DescriptionCardView.defaultProps = {
  data: null,
};

export default DescriptionCardView;
