import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import { Card, List } from "antd";
import { NetworkErrorsPropType } from "../../../customPropTypes";

const ProfileCardsErrorView = ({ networkErrors, title }) => {
  const styles = {
    errorTitleText: {
      paddingLeft: "8px",
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 0.85)",
    },
    itemTitleText: {
      fontSize: "14px",
      fontWeight: "normal",
    },
  };
  return (
    <div>
      <Card title={title}>
        <>
          <WarningOutlined />
          <span style={styles.errorTitleText}>
            {<FormattedMessage id="error.network" />}
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
      </Card>
    </div>
  );
};

ProfileCardsErrorView.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
};

export default injectIntl(ProfileCardsErrorView);
