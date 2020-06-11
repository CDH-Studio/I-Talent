import React, { useState } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import {
  Typography,
  Row,
  Col,
  Button,
  Form,
  Input,
  Switch,
  Select,
  Divider,
} from "antd";
import {
  SearchOutlined,
  SettingOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import logo from "../../assets/MyTalent-Logo-Full-v2.svg";
import { IntlPropType, IdDescriptionPropType } from "../../customPropTypes";

const { Option } = Select;
const { Title } = Typography;

const SearchBarView = ({
  intl,
  locationOptions,
  skillOptions,
  classOptions,
  branchOptions,
  handleSearch,
}) => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const styles = {
    outerForm: {
      width: "100%",
      paddingTop: "80px",
    },
    outerDiv: {
      width: "90%",
      maxWidth: "1100px",
      margin: "auto",
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

  const searchLabel = intl.formatMessage({
    id: "button.search",
    defaultMessage: "Search",
  });

  // Toggle expandable advanced search form
  const toggle = () => {
    setExpand(!expand);
  };

  // Handle form submission
  const onFinish = (values) => {
    handleSearch(values);
  };

  // Generate the basic input field for basic search
  const getBasicField = () => {
    return (
      <Form.Item style={{ width: "100%" }} label="" name="searchValue">
        <Input placeholder={searchLabel} size="large" />
      </Form.Item>
    );
  };

  // Generate the regular search fields
  const getBasicSearchForm = (displayForm) => {
    if (!displayForm) {
      return <div />;
    }

    return (
      <div>
        <div style={styles.mainSearchField}>{getBasicField()}</div>
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
          {intl.formatMessage({
            id: "button.clear",
            defaultMessage: "Clear",
          })}
        </Button>
      </div>
    );
  };

  // Generate the advanced search fields
  const getAdvancedSearchForm = (displayForm) => {
    // detect language
    const locale = intl.formatMessage({
      id: "language.code",
      defaultMessage: "en",
    });

    if (!displayForm) {
      return <div />;
    }
    return (
      <div style={{ marginBottom: "0" }}>
        <Row style={{ padding: "20px 5% 0px 5%" }}>
          <Col span={24} style={{ padding: "0px 0" }}>
            <Title level={2} style={{ fontSize: "1.3em" }}>
              <FormattedMessage id="advanced.search.button.text" />
            </Title>
          </Col>
        </Row>

        <Row style={{ padding: "20px 5% 5px 5%" }}>
          <Col span={24} style={{ padding: "0px 0" }}>
            <Title level={3} style={{ fontSize: "1em" }}>
              General Info
            </Title>
          </Col>
        </Row>
        <Row
          gutter={[48, 24]}
          style={{ padding: "0px 5%", marginBottom: "0px" }}
        >
          {/* form column one */}
          <Col span={12}>
            {/* name field */}
            <Form.Item
              label={<FormattedMessage id="advanced.search.form.name" />}
              name="name"
            >
              <Input style={{ width: "100%" }} placeholder={searchLabel} />
            </Form.Item>

            {/* classification field */}
            <Form.Item
              label={
                <FormattedMessage id="advanced.search.form.classification" />
              }
              name="classification"
            >
              <Select
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                maxTagCount={3}
                placeholder={searchLabel}
              >
                {classOptions.map((value) => {
                  return <Option key={value.id}>{value.description}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>

          {/* form column three */}
          <Col span={12}>
            {/* Location field */}
            <Form.Item
              label={<FormattedMessage id="advanced.search.form.location" />}
              name="location"
            >
              <Select
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
                maxTagCount={3}
              >
                {locationOptions.map((value) => {
                  return (
                    <Option key={value.id}>{value.description[locale]}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            {/* branch field */}
            <Form.Item
              label={<FormattedMessage id="advanced.search.form.branch" />}
              name="branch"
            >
              <Select
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
                maxTagCount={3}
              >
                {branchOptions.map((value) => {
                  return (
                    <Option key={value.description.en}>
                      {value.description[locale]}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ padding: "10px 5% 5px 5%" }}>
          <Col span={24} style={{ padding: "0px 0" }}>
            <Title level={3} style={{ fontSize: "1em" }}>
              Skills and Talent
            </Title>
          </Col>
        </Row>
        <Row
          gutter={[48, 24]}
          style={{ padding: "0px 5%", marginBottom: "0px" }}
        >
          {/* form column one */}
          <Col span={24}>
            {/* Skills field */}
            <Form.Item
              label={<FormattedMessage id="advanced.search.form.skills" />}
              name="skills"
            >
              <Select
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
                maxTagCount={10}
              >
                {skillOptions.map((value) => {
                  return (
                    <Option key={value.id}>{value.description[locale]}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            {/* classification field */}
            <Form.Item
              label={
                <FormattedMessage id="advanced.search.form.classification" />
              }
              name="classification"
            >
              <Select
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                maxTagCount={10}
                placeholder={searchLabel}
              >
                {classOptions.map((value) => {
                  return <Option key={value.id}>{value.description}</Option>;
                })}
              </Select>
            </Form.Item>
            {/* exFeeder field */}
            <Form.Item
              label={<FormattedMessage id="advanced.search.form.ex.feeder" />}
              name="exFeeder"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            width: "100%",
            textAlign: "center",
            margin: "-40px 0 30px 0",
          }}
        >
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
            shape="round"
            size="large"
            style={styles.clearBtn}
            onClick={() => {
              form.resetFields();
            }}
          >
            {intl.formatMessage({
              id: "button.clear",
              defaultMessage: "clear changes",
            })}
          </Button>
        </div>
        <Divider />
      </div>
    );
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={styles.outerForm}
      layout="vertical"
    >
      <div style={styles.outerDiv}>
        <div style={styles.mainSearchDiv}>
          <img
            src={logo}
            alt="I-Talent Logo"
            style={{ width: "80%", maxWidth: "300px" }}
          />
          {/* Gets main basic search field and shows buttons beneath */}
          {getBasicSearchForm(!expand)}
        </div>
        <div style={styles.advSearchCard}>
          {/* Gets fields for Advanced Search in collapse */}
          {getAdvancedSearchForm(expand)}
          {/* expand advance search btn */}
          <Row>
            <Col span={24} style={styles.advFieldPlacement}>
              <Button
                type="link"
                onClick={toggle}
                style={{ fontSize: 15 }}
                tabIndex="0"
                size="small"
              >
                {/* <SettingOutlined style={{ marginRight: "3px" }} /> */}
                {expand ? (
                  <div>
                    <UpOutlined style={{ marginRight: "3px" }} />
                    <FormattedMessage id="button.basic.search" />
                  </div>
                ) : (
                  <div>
                    <DownOutlined style={{ marginRight: "3px" }} />
                    <FormattedMessage id="button.advanced.search" />
                  </div>
                )}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
  );
};

SearchBarView.propTypes = {
  branchOptions: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.shape({
        en: PropTypes.string,
        fr: PropTypes.string,
      }),
    })
  ).isRequired,
  classOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  locationOptions: IdDescriptionPropType.isRequired,
  skillOptions: IdDescriptionPropType.isRequired,
  handleSearch: PropTypes.func.isRequired,
  intl: IntlPropType,
};

SearchBarView.defaultProps = {
  intl: undefined,
};

export default injectIntl(SearchBarView);
