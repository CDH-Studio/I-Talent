import React from "react";
import { FormattedMessage } from "react-intl";
import { CheckOutlined } from "@ant-design/icons";
import { ProfileInfoPropType } from "../../customPropTypes";

const ExFeederView = ({ data }) => {
  const styles = {
    exFeederTitleSpan: {
      paddingLeft: "8px",
    },
  };
  if (data.exFeeder) {
    return (
      <>
        <CheckOutlined />
        <span style={styles.exFeederTitleSpan}>
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
