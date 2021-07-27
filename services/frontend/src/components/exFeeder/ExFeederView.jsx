import { FormattedMessage } from "react-intl";
import {
  CheckCircleOutlined,
  WarningOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import "./ExFeederView.less";

const ExFeederView = ({ data }) => {
  if (data.exFeeder) {
    return (
      <div className="ex-feeder-success">
        <CheckCircleOutlined
          className="mr-2 ex-feeder-success-icon"
          aria-hidden="true"
        />
        <FormattedMessage id="profile.ex.feeder" />
      </div>
    );
  }
  if (data.exFeeder === false) {
    return (
      <div className="ex-feeder-negative">
        <WarningOutlined
          className="mr-2 ex-feeder-negative-icon"
          aria-hidden="true"
        />
        <FormattedMessage id="not.ex.feeder" />
      </div>
    );
  }
  return (
    <div className="ex-feeder-negative">
      <EyeInvisibleOutlined
        className="mr-2 ex-feeder-negative-icon"
        aria-hidden="true"
      />
      <FormattedMessage id="private.ex.feeder" />
    </div>
  );
};

ExFeederView.propTypes = {
  data: ProfileInfoPropType,
};

ExFeederView.defaultProps = {
  data: null,
};

export default ExFeederView;
