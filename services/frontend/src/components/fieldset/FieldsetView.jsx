import PropTypes from "prop-types";
import "./FieldsetView.less";

const Fieldset = ({ children, title }) => (
  <fieldset className="fieldset mt-1">
    <legend className="mb-2">{title}</legend>
    {children}
  </fieldset>
);

Fieldset.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.element.isRequired,
};

export default Fieldset;
