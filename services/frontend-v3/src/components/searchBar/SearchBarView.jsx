import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { Row, Col, Button, Form, Alert, Input } from "antd";
import {
  SearchOutlined,
  SettingOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import "@ant-design/compatible/assets/index.css";
import logo from "../../assets/MyTalent-Logo-Full-v2.svg";

function SearchBarView(props) {
  const [doNothing, setDoNothing] = useState(true);
  const [form] = Form.useForm();
  const { getFields, handleSearch, expand, toggle, data, empty } = props;

  const styles = {
    outerForm: {
      width: "100%",
      padding: "40px 50px",
    },
    outerDiv: {
      padding: "60px 20% 20px 20%",
    },
    mainSearchDiv: {
      backgroundColor: "#001C1A",
      borderRadius: "5px 5px 0 0",
      padding: "50px 80px",
      boxShadow: "10px 10px 10px #cccccc",
      textAlign: "center",
    },
    mainSearchField: {
      margin: "30px 10px 10px 10px",
    },
    submitBtn: {
      marginLeft: 8,
      width: "100%",
      maxWidth: "200px",
      marginTop: "10px",
    },
    clearBtn: {
      marginLeft: 8,
      marginTop: "10px",
    },
    advFieldStyles: {
      textAlign: "center",
      marginTop: "10px",
    },
    advSearchCard: {
      padding: "15px",
      backgroundColor: "#fff",
      boxShadow: "10px 10px 10px #cccccc",
      borderRadius: "0 0 5px 5px",
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

  const searchLabel = props.intl.formatMessage({
    id: "button.search",
    defaultMessage: "Search",
  });

  //Creates the basic input field for basic search and puts its data into children array
  const getBasicField = () => {
    return (
      <Form.Item style={{ width: "100%" }} label={""} name="searchValue">
        <Input placeholder={searchLabel} size="large" />
      </Form.Item>
    );
  };

  const onFinish = (values) => {
    handleSearch(values);
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
          <img src={logo} alt="UpSkill Logo" style={{ height: "60px" }} />;
          {/* Gets main basic search field and shows buttons beneath */}
          <div style={styles.mainSearchField}>{getBasicField(data)}</div>
          <Button
            shape="round"
            size="large"
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            style={styles.submitBtn}
          >
            {searchLabel}
          </Button>
          <Button
            ghost
            shape="round"
            size="large"
            style={styles.clearBtn}
            onClick={() => {
              form.resetFields();
            }}
          >
            {props.intl.formatMessage({
              id: "button.clear",
              defaultMessage: "Clear",
            })}
          </Button>
        </div>
        <div style={styles.advSearchCard}>
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
                <SettingOutlined style={{ marginRight: "3px" }} />
                {props.intl.formatMessage({
                  id: "advanced.search.button.text",
                  defaultMessage: "Advanced Search",
                })}
              </a>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
  );
}

export default injectIntl(SearchBarView);
