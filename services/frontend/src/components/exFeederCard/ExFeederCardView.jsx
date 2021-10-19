import { FormattedMessage } from "react-intl";
import {
  CheckCircleOutlined,
  EyeInvisibleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

import { ProfileInfoPropType } from "../../utils/customPropTypes";

import "./ExFeederCardView.less";

const ExFeederCardView = ({ data }) => {
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

ExFeederCardView.propTypes = {
  data: ProfileInfoPropType,
};

ExFeederCardView.defaultProps = {
  data: null,
};

export default ExFeederCardView;
