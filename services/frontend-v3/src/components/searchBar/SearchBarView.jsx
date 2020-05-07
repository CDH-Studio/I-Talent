import React, { useState } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import {
  Typography,
  Row,
  Col,
  Button,
  Form,
  Alert,
  Input,
  Switch,
  Select,
} from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import "@ant-design/compatible/assets/index.css";
import logo from "../../assets/MyTalent-Logo-Full-v2.svg";

const { Option } = Select;
const { Title } = Typography;

function SearchBarView(props) {
  const [expand, setExpand] = useState(false);
  const [doNothing, setDoNothing] = useState(true);
  const [form] = Form.useForm();
  const { handleSearch, data, empty } = props;

  const styles = {
    outerForm: {
      width: "100%",
      paddingTop: "80px",
    },
    outerDiv: {
      width: "90%",
      maxWidth: "1100px",
      margin: "auto",
      // padding: "60px 20% 20px 20%",
    },
    mainSearchDiv: {
      backgroundColor: "#001C1A",
      borderRadius: "5px 5px 0 0",
      padding: "50px 80px 40px 80px",
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
      textAlign: "center",
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

  const toggle = () => {
    setExpand(!expand);
  };

  // Generate the basic input field for basic search
  const getBasicField = () => {
    return (
      <Form.Item style={{ width: "100%" }} label={""} name="searchValue">
        <Input placeholder={searchLabel} size="large" />
      </Form.Item>
    );
  };

  // Generate the advanced search fields
  const getAdvancedSearchForm = () => {
    // detect language
    let locale = props.intl.formatMessage({
      id: "language.code",
      defaultMessage: "en",
    });

    if (!expand) {
      return <div />;
    } else {
      return (
        <div style={{ marginBottom: "0" }}>
          <Row style={{ padding: "20px 5% 5px 5%" }}>
            <Col span={24} style={{ padding: "0px 0" }}>
              <Title level={2} style={{ fontSize: "1.3em" }}>
                <FormattedMessage id={"advanced.search.button.text"} />
              </Title>
            </Col>
          </Row>

          <Row gutter={[48, 24]} style={{ padding: "0px 5%" }}>
            {/* form column one */}
            <Col span={8}>
              {/* name field */}
              <Form.Item
                label={<FormattedMessage id="advanced.search.form.name" />}
                name="name"
              >
                <Input style={{ width: "100%" }} placeholder={searchLabel} />
              </Form.Item>
              {/* Location field */}
              <Form.Item
                label={<FormattedMessage id="advanced.search.form.location" />}
                name={"location"}
              >
                <Select
                  style={{ width: "100% " }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  mode="multiple"
                  placeholder={searchLabel}
                >
                  {props.locationOptions.map((value) => {
                    return (
                      <Option key={value.id}>
                        {value.description[locale]}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            {/* form column two */}
            <Col span={8}>
              {/* Skills field */}
              <Form.Item
                label={<FormattedMessage id="advanced.search.form.skills" />}
                name={"skills"}
              >
                <Select
                  style={{ width: "100%" }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  mode="multiple"
                  placeholder={searchLabel}
                >
                  {props.skillOptions.map((value) => {
                    return (
                      <Option key={value.id}>
                        {value.description[locale]}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              {/* classification field */}
              <Form.Item
                label={
                  <FormattedMessage id="advanced.search.form.classification" />
                }
                name={"classification"}
              >
                <Select
                  style={{ width: "100%" }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  mode="multiple"
                  placeholder={searchLabel}
                >
                  {props.classOptions.map((value) => {
                    return <Option key={value.id}>{value.description}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<FormattedMessage id="advanced.search.form.branch" />}
                name={"branch"}
              >
                <Select
                  style={{ width: "100%" }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  mode="multiple"
                  placeholder={searchLabel}
                >
                  {props.branchOptions.map((value) => {
                    return (
                      <Option key={value.description.en}>
                        {value.description[locale]}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name={<FormattedMessage id="advanced.search.form.ex.feeder" />}
                label={"exFeeder"}
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </div>
      );
    }
  };

  const onFinish = (values) => {
    handleSearch(values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={styles.outerForm}
      layout={"vertical"}
    >
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
          <img
            src={logo}
            alt="UpSkill Logo"
            style={{ width: "80%", maxWidth: "300px" }}
          />
          ;{/* Gets main basic search field and shows buttons beneath */}
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
          {getAdvancedSearchForm()}
          <Row>
            <Col span={24} style={styles.advFieldPlacement}>
              <a
                href="javascript:void(0)"
                style={{ marginLeft: 8, fontSize: 14 }}
                tabIndex="0"
                onClick={toggle}
              >
                <SettingOutlined style={{ marginRight: "3px" }} />
                <FormattedMessage id={"advanced.search.button.text"} />
              </a>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
  );
}

export default injectIntl(SearchBarView);
