import React, { useState } from "react";
import { Button, List } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import UnexpectedErrorView from "./unexpectedErrorView";

const UnexpectedError = ({ errorCode }) => {
  const [back, setBack] = useState(false);
  const [showError, setShowError] = useState(false);
  const errors = useSelector(state => state.errors);

  const handleClick = () => {
    setBack(true);
  };

  if (back) {
    return <Redirect to="/" />;
  }

  return <UnexpectedErrorView extraContent={null} />;
};

export default UnexpectedError;

/*

  const extraContent = () => (
    <>
      <div>
        <Button onClick={() => setBack(true)}>
          <FormattedMessage id="error.button.retry" />
        </Button>
        <Button onClick={setShowError(oldValue => !oldValue)}>
          <FormattedMessage
            id={showError ? "error.button.hide" : "error.button.show"}
          />
        </Button>
      </div>
    </>
  );


(
 {showError ? null : null}

        <List
          size="small"
          dataSource={errors}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  <span>
                    {item.config.method.toUpperCase()} {item.config.url}
                  </span>
                }
                description={
                  item.response && item.response.data ? (
                    <>
                      <div>{item.response.status}</div>
                      <div>{item.response.statusText}</div>
                    </>
                  ) : (
                    <div>
                      <FormattedMessage id="error.no.backend.response" />
                    </div>
                  )
                }
              />
            </List.Item>
          )}
        />
      )*/
