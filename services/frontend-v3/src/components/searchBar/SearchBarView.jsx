import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { Form, Alert } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
//import { Icon as LegacyIcon } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Button, Card } from "antd";
import logo from "../../assets/MyTalent-Logo-Full.png";

function SearchBarView(props) {
  const [doNothing, setDoNothing] = useState(true);
  const [form] = Form.useForm();
  const {
    getFields,
    getBasicField,
    handleSearch,
    expand,
    toggle,
    data,
    empty,
  } = props;

  const searchLabel = props.intl.formatMessage({
    id: "button.search",
    defaultMessage: "Search",
  });

  const onFinish = (values) => {
    handleSearch(values);
  };

  const handleKeyPress = (e) => {
    console.log("toggled1");
    if (e.charCode === 32 || e.charCode === 13) {
      e.preventDefault();
      console.log("toggled2");
      toggle();
    }
  };

  return (
    <Form form={form} onFinish={onFinish} style={styles.outerForm}>
      {empty === true ? (
        <Alert
          message={props.intl.formatMessage({
            id: "alert.empty.search",
            defaultMessage: "Please input a value into the search bar below",
          })}
          type="error"
          style={styles.alert}
        />
      ) : (
        setDoNothing[true]
      )}
      <div style={styles.outerDiv}>
        <div style={styles.mainSearchDiv}>
          <header style={styles.header}>
            <img src={logo} alt="UpSkill Logo" style={{ height: "80px" }} />;
          </header>
          {/* Gets main basic search field and shows buttons beneath */}
          <div style={styles.advFieldStyles}>{getBasicField(data)}</div>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button shape="round" size="large" type="primary" htmlType="submit">
              {searchLabel}
            </Button>
            <Button
              ghost
              shape="round"
              size="large"
              style={{ marginLeft: 8 }}
              onClick={() => {
                form.resetFields();
              }}
            >
              {props.intl.formatMessage({
                id: "button.clear",
                defaultMessage: "Clear",
              })}
            </Button>
          </Col>
        </div>
        <Card style={styles.advSearchCard}>
          {/* Gets fields for Advanced Search in collapse */}
          <Row gutter={24} type="flex">
            {getFields(data)}
          </Row>
          <Row>
            <Col span={24} style={styles.advFieldPlacement}>
              <a
                href="javascript:void(0)"
                style={{ marginLeft: 8, fontSize: 14 }}
                tabIndex="0"
                onClick={toggle}
                // handleKeyPress={e => handleKeyPress(e)} --keeping in incase of future need
              >
                {props.intl.formatMessage({
                  id: "advanced.search.button.text",
                  defaultMessage: "Advanced Search",
                })}{" "}
                {expand ? <UpOutlined /> : <DownOutlined />}
              </a>
            </Col>
          </Row>
        </Card>
      </div>
    </Form>
  );
}

const styles = {
  outerForm: {
    width: "100%",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingTop: "60px",
  },
  outerDiv: {
    paddingTop: "60px",
    paddingLeft: "20%",
    paddingRight: "20%",
    paddingBottom: "20px",
  },
  mainSearchDiv: {
    backgroundColor: "#001C1A",
    borderRadius: "5px",
    paddingTop: "80px",
    paddingLeft: "80px",
    paddingRight: "80px",
    paddingBottom: "30px",
    boxShadow: "10px 10px 10px #cccccc",
  },
  header: {
    paddingBottom: "20px",
    textAlign: "center",
  },
  advFieldStyles: {
    textAlign: "center",
  },
  advSearchCard: {
    boxShadow: "10px 10px 10px #cccccc",
    borderRadius: "5px",
  },
  advFieldPlacement: {
    textAlign: "right",
  },
  alert: {
    fontSize: "14px",
    textAlign: "center",
    margin: "0 auto",
    width: "300px",
  },
};
export default injectIntl(SearchBarView);
