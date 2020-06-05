import PropTypes from "prop-types";
import React from "react";
import { FormattedMessage } from "react-intl";
import { CheckOutlined } from "@ant-design/icons";
import { Row, Col, List } from "antd";
import { ProfileInfoPropType } from "../../customPropTypes";

const ExFeederView = ({ locale, data }) => {
  const styles = {
    exFeederTitleSpan: {
      paddingLeft: "8px",
    },
  };

  return (
    <>
      <CheckOutlined />
      <span style={styles.exFeederTitleSpan}>
        <FormattedMessage id="profile.ex.feeder" />
      </span>
    </>
  );
};

ExFeederView.propTypes = {
  data: ProfileInfoPropType,
  locale: PropTypes.oneOf(["fr", "en"]).isRequired,
};

ExFeederView.defaultProps = {
  data: null,
};

export default ExFeederView;
