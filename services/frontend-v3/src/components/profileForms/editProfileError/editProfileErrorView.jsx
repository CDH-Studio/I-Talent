import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";

const EditProfileErrorView = ({ networkError }) => {
  const styles = {
    errorTitle: {
      paddingLeft: "8px",
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 0.85)",
    },
  };
  return (
    <>
      <>
        <WarningOutlined />
        <span style={styles.errorTitle}>
          <FormattedMessage id="error.network" />
        </span>
      </>
      <div>
        <div>
          {networkError.config.method.toUpperCase()} {networkError.config.url}
        </div>
        {networkError && networkError.response && networkError.response.data ? (
          <>
            <div>{networkError.response.data.status}</div>
            <div>{networkError.response.data.message}</div>
          </>
        ) : (
          <div>no response from backend server</div>
        )}
      </div>
    </>
  );
};

export default injectIntl(EditProfileErrorView);
