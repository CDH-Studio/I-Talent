import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import { List } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { NetworkErrorsPropType } from "../../../../customPropTypes";

const ProfileErrorView = ({ networkErrors }) => {
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
          <FormattedMessage id="error.network" />
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

ProfileErrorView.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
};

export default injectIntl(ProfileErrorView);
