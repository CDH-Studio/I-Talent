import { Descriptions } from "antd";
import PropTypes from "prop-types";

const DescriptionCardView = ({ data }) => (
  <Descriptions.Item>{data}</Descriptions.Item>
);

DescriptionCardView.propTypes = {
  data: PropTypes.string,
};

DescriptionCardView.defaultProps = {
  data: null,
};

export default DescriptionCardView;
