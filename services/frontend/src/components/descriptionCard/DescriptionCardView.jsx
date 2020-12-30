import PropTypes from "prop-types";
import { Descriptions } from "antd";

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
