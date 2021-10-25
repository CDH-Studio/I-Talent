import { FormattedMessage } from "react-intl";
import { Empty } from "antd";
import PropTypes from "prop-types";

import TagList from "../tagList/TagList";

const EmploymentEquityView = ({ groups }) =>
  groups && groups.length > 0 ? (
    <TagList data={groups} tagStyle="secondary" />
  ) : (
    <Empty
      description={<FormattedMessage id="employment.equity.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );

EmploymentEquityView.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

EmploymentEquityView.defaultProps = {
  groups: [],
};

export default EmploymentEquityView;
