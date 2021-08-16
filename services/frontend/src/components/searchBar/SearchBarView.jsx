import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  DoubleRightOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Switch,
  TreeSelect,
  Typography,
} from "antd";
import PropTypes from "prop-types";

import logo from "../../assets/I-talent-logo.png";
import Fieldset from "../fieldset/Fieldset";
import CustomDropdown from "../formItems/CustomDropdown";

import "./SearchBarView.less";

const { SHOW_CHILD } = TreeSelect;
const { Title } = Typography;

const SearchBarView = ({
  anyMentorSkills,
  locationOptions,
  skillOptions,
  classOptions,
  branchOptions,
  handleSearch,
  handleAnyMentorSkillsChange,
}) => {
  const [expandAdvancedSearch, setExpandAdvancedSearch] = useState(false);
  const [form] = Form.useForm();
  const intl = useIntl();

  // Toggle expandable advanced search form
  const toggle = () => {
    setExpandAdvancedSearch(!expandAdvancedSearch);
  };

  // Handle form submission
  const onFinish = (values) => {
    handleSearch(values);
  };

  // Generate the basic input field for basic search
  const getBasicField = () => (
    <Form.Item
      label={
        <span className="searchLabel">
          <FormattedMessage id="basic.search" />
        </span>
      }
      name="searchValue"
    >
      <Input placeholder={intl.formatMessage({ id: "search" })} size="large" />
    </Form.Item>
  );

  // Generate the regular search fields
  const getBasicSearchForm = (displayForm) => {
    if (!displayForm) {
      return null;
    }

    return (
      <div>
        <div className="search-mainSearchField">{getBasicField()}</div>
        <Button
          className="search-submitBtn"
          htmlType="submit"
          size="large"
          type="primary"
        >
          <SearchOutlined aria-hidden="true" className="mr-1" />
          <FormattedMessage id="search" />
        </Button>
        <Button
          className="search-clearBtn"
          ghost
          onClick={() => {
            form.resetFields();
          }}
          size="large"
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
      <div>
        <Row style={{ padding: "20px 5% 0px 5%" }}>
          <Col className="p-0" span={24}>
            <Title level={2} style={{ fontSize: "1.3em" }}>
              <SettingOutlined
                style={{ color: "#3CBAB3", marginRight: "4px" }}
              />
              <FormattedMessage id="advanced.search" />
            </Title>
            <FormattedMessage id="advanced.search.description" />
          </Col>
        </Row>

        {/* General Info */}
        <Row style={{ padding: "15px 5%" }}>
          <Fieldset title={<FormattedMessage id="general.info" />}>
            {/* form column one */}
            <Col span={24}>
              {/* name field */}
              <Form.Item label={<FormattedMessage id="name" />} name="name">
                <Input
                  placeholder={intl.formatMessage({
                    id: "search",
                  })}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              {/* Location field */}
              <Form.Item
                label={<FormattedMessage id="location" />}
                name="locations"
              >
                <CustomDropdown
                  ariaLabel={intl.formatMessage({
                    id: "location",
                  })}
                  isMulti
                  isSearchable
                  maxSelectedOptions={3}
                  options={locationOptions}
                  placeholderText={<FormattedMessage id="type.to.search" />}
                />
              </Form.Item>

              {/* branch field */}
              <Form.Item
                label={<FormattedMessage id="branch" />}
                name="branches"
              >
                <CustomDropdown
                  ariaLabel={intl.formatMessage({
                    id: "branch",
                  })}
                  isMulti
                  isSearchable
                  maxSelectedOptions={3}
                  options={branchOptions}
                  placeholderText={<FormattedMessage id="type.to.search" />}
                />
              </Form.Item>

              {/* classification field */}
              <Form.Item
                label={<FormattedMessage id="classification" />}
                name="classifications"
              >
                <CustomDropdown
                  ariaLabel={intl.formatMessage({
                    id: "classification",
                  })}
                  isMulti
                  isSearchable
                  maxSelectedOptions={3}
                  options={classOptions}
                  placeholderText={<FormattedMessage id="type.to.search" />}
                />
              </Form.Item>
            </Col>
          </Fieldset>
        </Row>

        {/* Skills section */}
        <Row style={{ padding: "5px 5%" }}>
          <Fieldset
            title={<FormattedMessage id="skills.and.talent.question" />}
          >
            <Col span={24}>
              <Form.Item label={<FormattedMessage id="skills" />} name="skills">
                <TreeSelect
                  className="custom-bubble-select-style"
                  maxTagCount={15}
                  placeholder={<FormattedMessage id="search" />}
                  showCheckedStrategy={SHOW_CHILD}
                  showSearch
                  treeCheckable
                  treeData={skillOptions}
                  treeNodeFilterProp="title"
                />
              </Form.Item>
            </Col>
          </Fieldset>
        </Row>

        {/* Ex-Feeder section */}
        <Row style={{ padding: "5px 5%" }}>
          <Fieldset title={<FormattedMessage id="ex.feeder.question" />}>
            <Col span={24}>
              <Form.Item
                label={<FormattedMessage id="ex.feeder" />}
                name="exFeeder"
                style={{ marginBottom: "5px" }}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Fieldset>
        </Row>

        {/* Mentorship section */}
        <Row style={{ padding: "5px 5%" }}>
          <Fieldset title={<FormattedMessage id="looking.for.mentor" />}>
            <Col span={24}>
              {/* Mentorship Skills field */}
              <Form.Item
                className="mb-0"
                label={<FormattedMessage id="mentorship.skills" />}
                name="mentorSkills"
              >
                <TreeSelect
                  className="custom-bubble-select-style"
                  disabled={anyMentorSkills}
                  maxTagCount={15}
                  placeholder={<FormattedMessage id="search" />}
                  showCheckedStrategy={SHOW_CHILD}
                  showSearch
                  treeCheckable
                  treeData={skillOptions}
                  treeNodeFilterProp="title"
                />
              </Form.Item>
              <Form.Item name="anyMentorSkills" valuePropName="checked">
                <Checkbox onChange={handleAnyMentorSkillsChange}>
                  <FormattedMessage id="select.any.mentors" />
                </Checkbox>
              </Form.Item>
            </Col>
          </Fieldset>
        </Row>
        <div className="search-advancedSearchBtns">
          <Button
            className="search-submitBtn"
            htmlType="submit"
            size="large"
            type="primary"
          >
            <SearchOutlined aria-hidden="true" className="mr-1" />
            <FormattedMessage id="search" />
          </Button>
          <Button
            className="search-clearBtn"
            onClick={() => {
              form.resetFields();
            }}
            size="large"
          >
            <FormattedMessage id="clear.changes" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Form
      className="search-outerForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onKeyPress={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      <div className="search-outerDiv">
        <div className="search-mainSearchDiv">
          <img
            alt="I-Talent Logo"
            src={logo}
            style={{ maxWidth: "370px", width: "80%" }}
          />
          {/* Gets main basic search field and shows buttons beneath */}
          {getBasicSearchForm(!expandAdvancedSearch)}
        </div>
        <div className="search-advSearchCard">
          {/* expand advance search btn */}
          <Row>
            <Col className="search-advFieldPlacement" span={24}>
              <Button
                aria-expanded={expandAdvancedSearch}
                onClick={toggle}
                size="middle"
                style={{ fontSize: 15 }}
                tabIndex={0}
                type="link"
              >
                <DoubleRightOutlined
                  aria-hidden="true"
                  className="mr-2"
                  rotate={expandAdvancedSearch ? "270" : "90"}
                />
                <FormattedMessage id="advanced.search" />
              </Button>
            </Col>
          </Row>
          {/* Gets fields for Advanced Search in collapse */}
          {getAdvancedSearchForm(expandAdvancedSearch)}
        </div>
      </div>
    </Form>
  );
};

SearchBarView.propTypes = {
  anyMentorSkills: PropTypes.bool.isRequired,
  branchOptions: PropTypes.arrayOf(
    PropTypes.PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  classOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  handleAnyMentorSkillsChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  locationOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  skillOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
};

export default SearchBarView;
