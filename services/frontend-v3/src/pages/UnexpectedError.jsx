import React, { useState } from "react";
import { Button, List, Result } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const maxStackLines = 5;

const UnexpectedError = ({ history }) => {
  const [showError, setShowError] = useState(false);
  const errors = useSelector(state => state.errors);

  const styles = {
    content: { textAlign: "left", maxWidth: "1200px", margin: "0px" },
    errorTitle: {},
    errorDescription: { marginBottom: "0.0em", marginLeft: "1em" },
  };

  return (
    <Result
      //status={resultProps.status}
      title="Unexpected Error"
      subTitle="Something when wrong"
      status={500}
      extra={
        <div style={{ textAlign: "center" }}>
          <div>
            <Button onClick={() => history.goBack()}>
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
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <span style={styles.errorTitle}>{item.title}</span>
                        }
                        description={item.description.map(val => (
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
  );
};

export default UnexpectedError;
