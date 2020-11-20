import { FormattedMessage } from "react-intl";
import { CheckOutlined } from "@ant-design/icons";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import "./ExFeederView.less";

const ExFeederView = ({ data }) => {
  if (data.exFeeder) {
    return (
      <>
        <CheckOutlined />
        <span className="exFeederTitleSpan">
          <FormattedMessage id="profile.ex.feeder" />
        </span>
      </>
    );
  }
  if (data.exFeeder === false) {
    return <FormattedMessage id="profile.not.ex.feeder" />;
  }
  return <FormattedMessage id="profile.private.ex.feeder" />;
};

ExFeederView.propTypes = {
  data: ProfileInfoPropType,
};

ExFeederView.defaultProps = {
  data: null,
};

export default ExFeederView;
