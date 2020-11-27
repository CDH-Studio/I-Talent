import { useState } from "react";
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
  Checkbox,
  TreeSelect,
} from "antd";
import {
  SearchOutlined,
  SettingOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import logo from "../../assets/I-talent-logo.png";
import { IntlPropType } from "../../utils/customPropTypes";
import filterOption from "../../functions/filterSelectInput";
import "./SearchBarView.less";

const { SHOW_CHILD } = TreeSelect;
const { Option } = Select;
const { Title } = Typography;

const SearchBarView = ({
  anyMentorSkills,
  intl,
  locationOptions,
  skillOptions,
  classOptions,
  branchOptions,
  handleSearch,
  handleAnyMentorSkillsChange,
}) => {
  const [expandAdvancedSearch, setExpandAdvancedSearch] = useState(false);
  const [form] = Form.useForm();

  const searchLabel = intl.formatMessage({
    id: "search",
  });

  // Toggle expandable advanced search form
  const toggle = () => {
    setExpandAdvancedSearch(!expandAdvancedSearch);
  };

  // Handle form submission
  const onFinish = (values) => {
    handleSearch(values);
  };

  // Generate the basic input field for basic search
  const getBasicField = () => {
    return (
      <Form.Item
        label={
          <span className="searchLabel">
            <FormattedMessage id="basic.search" />
          </span>
        }
        name="searchValue"
      >
        <Input placeholder={searchLabel} size="large" />
      </Form.Item>
    );
  };

  // Generate the regular search fields
  const getBasicSearchForm = (displayForm) => {
    if (!displayForm) {
      return null;
    }

    return (
      <div>
        <div className="search-mainSearchField">{getBasicField()}</div>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          icon={<SearchOutlined />}
          className="search-submitBtn"
        >
          {searchLabel}
        </Button>
        <Button
          ghost
          size="large"
          className="search-clearBtn"
          onClick={() => {
            form.resetFields();
          }}
        >
          <FormattedMessage id="clear.changes" />
        </Button>
      </div>
    );
  };

  // Generate the advanced search fields
  const getAdvancedSearchForm = (displayForm) => {
    if (!displayForm) {
      return null;
    }
    return (
      <div style={{ marginBottom: "0" }}>
        <Row style={{ padding: "20px 5% 0px 5%" }}>
          <Col span={24} style={{ padding: "0px 0" }}>
            <Title level={2} style={{ fontSize: "1.3em" }}>
              <SettingOutlined
                style={{ marginRight: "4px", color: "#3CBAB3" }}
              />
              <FormattedMessage id="advanced.search" />
            </Title>
            <FormattedMessage id="advanced.search.description" />
          </Col>
        </Row>

        <Row style={{ padding: "15px 5% 0px 5%" }}>
          <Col span={24} style={{ padding: "0px 0" }}>
            <Title level={3} style={{ fontSize: "1em" }}>
              <FormattedMessage id="search.advanced.general.title" />
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
              label={<FormattedMessage id="name" />}
              name="name"
            >
              <Input style={{ width: "100%" }} placeholder={searchLabel} />
            </Form.Item>

            {/* classification field */}
            <Form.Item
              label={
                <FormattedMessage id="classification" />
              }
              name="classifications"
            >
              <Select
                style={{ width: "100%" }}
                mode="multiple"
                maxTagCount={3}
                placeholder={searchLabel}
                filterOption={filterOption}
              >
                {classOptions.map((value) => {
                  return <Option key={value.id}>{value.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>

          {/* form column three */}
          <Col span={12}>
            {/* Location field */}
            <Form.Item
              label={<FormattedMessage id="work.location" />}
              name="locations"
            >
              <Select
                style={{ width: "100%" }}
                mode="multiple"
                placeholder={searchLabel}
                maxTagCount={3}
                filterOption={filterOption}
              >
                {locationOptions.map((value) => {
                  return (
                    <Option key={value.id}>
                      {value.streetNumber} {value.streetName}, {value.city},{" "}
                      {value.province}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            {/* branch field */}
            <Form.Item
              label={<FormattedMessage id="branch" />}
              name="branches"
            >
              <Select
                style={{ width: "100%" }}
                mode="multiple"
                placeholder={searchLabel}
                maxTagCount={3}
                filterOption={filterOption}
              >
                {branchOptions.map((value) => {
                  return <Option key={value}>{value}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ padding: "5px 5% 5px 5%" }}>
          <Col span={24} style={{ padding: "0px 0" }}>
            <Title level={3} style={{ fontSize: "1em" }}>
              <FormattedMessage id="search.advanced.skill.title" />
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
              label={<FormattedMessage id="skills" />}
              name="skills"
            >
              <TreeSelect
                className="custom-bubble-select-style"
                treeData={skillOptions}
                treeCheckable
                showCheckedStrategy={SHOW_CHILD}
                placeholder={<FormattedMessage id="input.placeholder.select" />}
                treeNodeFilterProp="title"
                showSearch
                maxTagCount={15}
              />
            </Form.Item>
            {/* classification field */}
            <Form.Item
              label={
                <FormattedMessage id="mentorship.skills" />
              }
              name="mentorSkills"
            >
              <TreeSelect
                className="custom-bubble-select-style"
                treeData={skillOptions}
                treeCheckable
                showCheckedStrategy={SHOW_CHILD}
                placeholder={<FormattedMessage id="input.placeholder.select" />}
                treeNodeFilterProp="title"
                showSearch
                maxTagCount={15}
                disabled={anyMentorSkills}
              />
            </Form.Item>
            <Form.Item name="anyMentorSkills" valuePropName="checked">
              <Checkbox onChange={handleAnyMentorSkillsChange}>
                <FormattedMessage id="select.any.mentors" />
              </Checkbox>
            </Form.Item>
            {/* exFeeder field */}
            <Form.Item
              label={<FormattedMessage id="ex.feeder" />}
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
            size="large"
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="search-submitBtn"
          >
            {searchLabel}
          </Button>
          <Button
            size="large"
            className="search-clearBtn"
            onClick={() => {
              form.resetFields();
            }}
          >
            <FormattedMessage id="clear.changes" />
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
      className="search-outerForm"
      layout="vertical"
    >
      <div className="search-outerDiv">
        <div className="search-mainSearchDiv">
          <img
            src={logo}
            alt="I-Talent Logo"
            style={{ width: "80%", maxWidth: "370px" }}
          />
          {/* Gets main basic search field and shows buttons beneath */}
          {getBasicSearchForm(!expandAdvancedSearch)}
        </div>
        <div className="search-advSearchCard">
          {/* Gets fields for Advanced Search in collapse */}
          {getAdvancedSearchForm(expandAdvancedSearch)}
          {/* expand advance search btn */}
          <Row>
            <Col span={24} className="search-advFieldPlacement">
              <Button
                type="link"
                onClick={toggle}
                style={{ fontSize: 15 }}
                tabIndex={0}
                size="middle"
              >
                {expandAdvancedSearch ? (
                  <>
                    <DoubleRightOutlined rotate="270" />
                    <span>
                      <FormattedMessage id="basic.search" />
                    </span>
                  </>
                ) : (
                    <>
                      <DoubleRightOutlined rotate="90" />
                      <span>
                        <FormattedMessage id="advanced.search" />
                      </span>
                    </>
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
  branchOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  classOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  locationOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.string,
      streetName: PropTypes.string,
      streetNumber: PropTypes.number,
    })
  ).isRequired,
  skillOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  handleSearch: PropTypes.func.isRequired,
  intl: IntlPropType,
  anyMentorSkills: PropTypes.bool.isRequired,
  handleAnyMentorSkillsChange: PropTypes.func.isRequired,
};

SearchBarView.defaultProps = {
  intl: undefined,
};

export default injectIntl(SearchBarView);
