import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import { PageHeader, List } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { NetworkErrorsPropType } from "../../../customPropTypes";

const AdminErrorContentView = ({ networkErrors }) => {
  const styles = {
    errorTitleText: { paddingLeft: "8px" },
    itemTitleText: {
      fontSize: "14px",
      fontWeight: "normal",
    },
  };
  return (
    <>
      <PageHeader
        title={
          <>
            <WarningOutlined />
            <span style={styles.errorTitleText}>
              <FormattedMessage id="error.network" />
            </span>
          </>
        }
      />
      <List
        size="small"
        dataSource={networkErrors}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={
                <span style={styles.itemTitleText}>
                  {item.config.method.toUpperCase()} {item.config.url}
                </span>
              }
              description={
                item.response && item.response.data ? (
                  <>
                    <div style={styles.itemDescription}>
                      {item.response.status}
                    </div>
                    <div style={styles.itemDescription}>
                      {item.response.statusText}
                    </div>
                  </>
                ) : (
                  <div style={styles.itemDescription}>
                    <FormattedMessage id="error.no.backend.response" />
                  </div>
                )
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};
AdminErrorContentView.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
};

export default injectIntl(AdminErrorContentView);
