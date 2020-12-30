import PropTypes from "prop-types";
import AboutLayout from "../components/layouts/aboutLayout/AboutLayout";

/** UI for the landing route layout */
const About = ({ type }) => <AboutLayout type={type} />;

About.propTypes = {
  type: PropTypes.oneOf(["about", "help", "privacy", "terms"]).isRequired,
};

export default About;
