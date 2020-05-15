import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";

const AdminErrorContentView = ({ networkError }) => {
  const styles = {
    errorTitle: { paddingLeft: "8px" },
  };
  return (
    <>
      <PageHeader
        title={
          <>
            <WarningOutlined />
            <span style={styles.errorTitle}>
              <FormattedMessage id="error.network" />
            </span>
          </>
        }
      />
      <div>
        <p>
          {networkError.config.method.toUpperCase()} {networkError.config.url}
        </p>
        {networkError && networkError.response && networkError.response.data ? (
          <>
            <p>{networkError.response.data.status}</p>
            <p>{networkError.response.data.message}</p>
          </>
        ) : (
          <p>no response from backend server</p>
        )}
      </div>
    </>
  );
};

export default injectIntl(AdminErrorContentView);
