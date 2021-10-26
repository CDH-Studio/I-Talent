import { FormattedMessage } from "react-intl";
import { Descriptions, Empty } from "antd";
import PropTypes from "prop-types";

const AboutMeCardView = ({ data }) =>
  data ? (
    <Descriptions.Item>{data}</Descriptions.Item>
  ) : (
    <Empty
      description={<FormattedMessage id="not.provided" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );

AboutMeCardView.propTypes = {
  data: PropTypes.string,
};

AboutMeCardView.defaultProps = {
  data: null,
};

export default AboutMeCardView;
