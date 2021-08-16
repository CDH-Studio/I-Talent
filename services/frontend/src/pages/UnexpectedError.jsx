import {
  ExclamationCircleOutlined,
  HomeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Col, List, Row } from "antd";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import ErrorResultView from "../components/errorResult/errorResultView";

const styles = {
  list: { width: "100%", marginTop: "1em", textAlign: "left", maxWidth: 700 },
  errorDescription: { marginBottom: 0 },
};

const UnexpectedError = () => {
  const [showError, setShowError] = useState(false);
  const errors = useSelector((state) => state.errors);
  const history = useHistory();

  return (
    <ErrorResultView
      extra={
        <Col>
          <Row gutter={[10, 10]} justify="center">
            <Col>
              <Button onClick={history.goBack} type="primary">
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
                  <FormattedMessage id="back.to.home" />
                </span>
              </Button>
            </Col>
            <Col>
              <Button onClick={() => setShowError((oldValue) => !oldValue)}>
                <ExclamationCircleOutlined />
                <span>
                  <FormattedMessage
                    id={showError ? "hide.error.log" : "show.error.log"}
                  />
                </span>
              </Button>
            </Col>
          </Row>
          <Row justify="center">
            {showError && (
              <List
                dataSource={errors}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      description={item.description.map((val) => (
                        <p style={styles.errorDescription}>{val}</p>
                      ))}
                      title={item.title}
                    />
                  </List.Item>
                )}
                style={styles.list}
              />
            )}
          </Row>
        </Col>
      }
      status="500"
      subTitle={<FormattedMessage id="something.went.wrong" />}
      title={<FormattedMessage id="unexpected.error" />}
    />
  );
};

UnexpectedError.propTypes = {};

export default UnexpectedError;
