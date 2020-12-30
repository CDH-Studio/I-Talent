import PropTypes from "prop-types";
import AboutLayoutView from "./AboutLayoutView";

/**
 *  LandingLayout(props)
 *
 *  this is the controller for LandingLayoutView
 */
const AboutLayout = ({ type }) => <AboutLayoutView type={type} />;

AboutLayout.propTypes = {
  type: PropTypes.oneOf(["about", "help", "privacy", "terms"]).isRequired,
};

export default AboutLayout;
