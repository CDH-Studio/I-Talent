import "./ExFeederView.less";

import {
  CheckCircleOutlined,
  EyeInvisibleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import { ProfileInfoPropType } from "../../utils/customPropTypes";

const ExFeederView = ({ data }) => {
  if (data.exFeeder) {
    return (
      <div className="ex-feeder-success">
        <CheckCircleOutlined
          aria-hidden="true"
          className="mr-2 ex-feeder-success-icon"
        />
        <FormattedMessage id="profile.ex.feeder" />
      </div>
    );
  }
  if (data.exFeeder === false) {
    return (
      <div className="ex-feeder-negative">
        <WarningOutlined
          aria-hidden="true"
          className="mr-2 ex-feeder-negative-icon"
        />
        <FormattedMessage id="not.ex.feeder" />
      </div>
    );
  }
  return (
    <div className="ex-feeder-negative">
      <EyeInvisibleOutlined
        aria-hidden="true"
        className="mr-2 ex-feeder-negative-icon"
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
