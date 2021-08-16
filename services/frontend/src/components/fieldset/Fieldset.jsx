import PropTypes from "prop-types";

import FieldsetView from "./FieldsetView";

const Fieldset = ({ children, title }) => (
  <FieldsetView title={title}>{children}</FieldsetView>
);

Fieldset.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.element.isRequired,
};

export default Fieldset;
