import React, { useState } from "react";
import { Button, List, Result } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const maxStackLines = 5;

const UnexpectedError = ({ errorCode }) => {
  const [back, setBack] = useState(false);
  const [showError, setShowError] = useState(false);
  const errors = useSelector(state => state.errors);

  const styles = {
    content: { textAlign: "left", maxWidth: "1200px", margin: "0px" },
    errorTitle: {},
    axiosErrorDescription: { marginBottom: "0.25em", marginLeft: "1em" },
    defaultErrorDescription: { marginBottom: "0.25em", marginLeft: "1em" },
  };

  const handleClick = () => {
    setBack(true);
  };

  if (back) {
    return <Redirect to="/" />;
  }

  return (
    <Result
      //status={resultProps.status}
      title="Unexpected Error"
      subTitle="Something when wrong"
      extra={
        <div style={{ textAlign: "center" }}>
          <div>
            <Button onClick={() => setBack(oldValue => !oldValue)}>
              <FormattedMessage id="error.retry" />
            </Button>
            <Button onClick={() => setShowError(oldValue => !oldValue)}>
              <FormattedMessage id="error.show" />
            </Button>
          </div>
          <div style={{ display: "inline-block", textAlign: "left" }}>
            <div style={styles.content}>
              {showError ? (
                <List
                  dataSource={errors}
                  renderItem={item => {
                    if (item.isAxiosError) {
                      return (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <span style={styles.errorTitle}>
                                {item.config.method.toUpperCase()}{" "}
                                {item.config.url}
                              </span>
                            }
                            description={
                              item.response && item.response.data ? (
                                <>
                                  <div style={styles.axiosErrorDescription}>
                                    {item.response.status}
                                  </div>
                                  <div style={styles.axiosErrorDescription}>
                                    {item.response.statusText}
                                  </div>
                                </>
                              ) : (
                                <div style={styles.axiosErrorDescription}>
                                  <FormattedMessage id="error.no.backend.response" />
                                </div>
                              )
                            }
                          />
                        </List.Item>
                      );
                    } else {
                      return (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <span style={styles.errorTitle}>
                                {item.message}
                              </span>
                            }
                            description={
                              <div>
                                {item.stack
                                  .split("\n")
                                  .slice(maxStackLines)
                                  .map(val => {
                                    console.log("VAL", val);
                                    return (
                                      <p style={styles.defaultErrorDescription}>
                                        {val}
                                      </p>
                                    );
                                  })}
                              </div>
                            }
                          />
                        </List.Item>
                      );
                    }
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default UnexpectedError;
