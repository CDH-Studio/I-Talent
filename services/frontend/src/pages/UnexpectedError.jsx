import React, { useState } from "react";
import { Button, List, Result, Space, Col, Row } from "antd";
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
    list: { width: "100%", marginTop: "1em", textAlign: "left", maxWidth: 700 },
    errorDescription: { marginBottom: 0 },
  };

  return (
    <AppLayout>
      <Result
        title={<FormattedMessage id="error.redirect.title" />}
        subTitle={<FormattedMessage id="error.redirect.subtitle" />}
        status={500}
        extra={
          <Col>
            <Row justify="center" gutter={[10, 10]}>
              <Col>
                <Button type="primary" onClick={() => history.goBack()}>
                  <ReloadOutlined />
                  <span>
                    <FormattedMessage id="error.retry" />
                  </span>
                </Button>
              </Col>
              <Col>
                <Button onClick={() => history.push("/")}>
                  <HomeOutlined />
                  <span>
                    <FormattedMessage id="back.to.landing" />
                  </span>
                </Button>
              </Col>
              <Col>
                <Button onClick={() => setShowError((oldValue) => !oldValue)}>
                  <ExclamationCircleOutlined />
                  <span>
                    <FormattedMessage
                      id={showError ? "error.hide" : "error.show"}
                    />
                  </span>
                </Button>
              </Col>
            </Row>
            <Row justify="center">
              {showError && <List
                dataSource={errors}
                style={styles.list}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description.map((val) => (
                        <p style={styles.errorDescription}>{val}</p>
                      ))}
                    />
                  </List.Item>
                )}
              />}
            </Row>
          </Col>
        }
      />
    </AppLayout>
  );
};

UnexpectedError.propTypes = {};

export default UnexpectedError;
