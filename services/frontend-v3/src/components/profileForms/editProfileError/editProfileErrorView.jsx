import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import { List } from "antd";
import { NetworkErrorsPropType } from "../../../customPropTypes";

const EditProfileErrorView = ({ networkErrors, customErrorTitle }) => {
  const styles = {
    errorTitleText: {
      paddingLeft: "8px",
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 0.85)",
    },
    itemTitleText: {
      wordBreak: "break-word",
      fontSize: "14px",
      fontWeight: "normal",
    },
    itemDescription: {
      wordBreak: "break-word",
    },
  };
  return (
    <>
      <>
        <WarningOutlined />
        <span style={styles.errorTitleText}>
          {customErrorTitle || <FormattedMessage id="error.network" />}
        </span>
      </>
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
                    No response from backend
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

EditProfileErrorView.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
};

export default injectIntl(EditProfileErrorView);
