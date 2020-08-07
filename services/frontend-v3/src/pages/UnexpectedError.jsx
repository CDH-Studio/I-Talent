import React, { useState } from "react";
import { Button, List, Result, Space } from "antd";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import {
  HomeOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import AppLayout from "../components/layouts/appLayout/AppLayout";

const UnexpectedError = () => {
  const [showError, setShowError] = useState(false);
  const errors = useSelector((state) => state.errors);

  const history = useHistory();

  const styles = {
    content: { textAlign: "left", maxWidth: "1200px", margin: "0px" },
    errorTitle: {},
    errorDescription: { marginBottom: "0.0em", marginLeft: "1em" },
  };

  return (
    <AppLayout>
      <Result
        title={<FormattedMessage id="error.redirect.title" />}
        subTitle={<FormattedMessage id="error.redirect.subtitle" />}
        status={500}
        extra={
          <div style={{ textAlign: "center" }}>
            <div>
              <Space size="small">
                <Button type="primary" onClick={() => history.goBack()}>
                  <ReloadOutlined style={{ marginRight: 10 }} />
                  <FormattedMessage id="error.retry" />
                </Button>
                <Button onClick={() => history.push("/")}>
                  <HomeOutlined style={{ marginRight: 10 }} />
                  <FormattedMessage id="back.to.landing" />
                </Button>
                <Button onClick={() => setShowError((oldValue) => !oldValue)}>
                  <ExclamationCircleOutlined style={{ marginRight: 10 }} />
                  <FormattedMessage
                    id={showError ? "error.hide" : "error.show"}
                  />
                </Button>
              </Space>
            </div>
            <div style={{ display: "inline-block", textAlign: "left" }}>
              <div style={styles.content}>
                {showError ? (
                  <List
                    dataSource={errors}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <span style={styles.errorTitle}>{item.title}</span>
                          }
                          description={item.description.map((val) => (
                            <p style={styles.errorDescription}>{val}</p>
                          ))}
                        />
                      </List.Item>
                    )}
                  />
                ) : null}
              </div>
            </div>
          </div>
        }
      />
    </AppLayout>
  );
};

UnexpectedError.propTypes = {};

export default UnexpectedError;
