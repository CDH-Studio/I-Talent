import { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Typography,
  Row,
  Col,
  Button,
  Form,
  Input,
  Switch,
  Divider,
  Checkbox,
  TreeSelect,
} from "antd";
import {
  SearchOutlined,
  SettingOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import CustomDropdown from "../formItems/CustomDropdown";
import Fieldset from "../fieldset/Fieldset";
import logo from "../../assets/I-talent-logo.png";
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
  const getBasicField = () => (
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

        {/* General Info */}
        <Row style={{ padding: "15px 5%" }}>
          <Fieldset title={<FormattedMessage id="general.info" />}>
            {/* form column one */}
            <Col span={24}>
              {/* name field */}
              <Form.Item label={<FormattedMessage id="name" />} name="name">
                <Input style={{ width: "100%" }} placeholder={searchLabel} />
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
                  placeholderText={<FormattedMessage id="type.to.search" />}
                  options={locationOptions}
                  isSearchable
                  isMulti
                  maxSelectedOptions={3}
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
                  placeholderText={<FormattedMessage id="type.to.search" />}
                  options={branchOptions}
                  isSearchable
                  isMulti
                  maxSelectedOptions={3}
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
                  placeholderText={<FormattedMessage id="type.to.search" />}
                  options={classOptions}
                  isSearchable
                  isMulti
                  maxSelectedOptions={3}
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
                  treeData={skillOptions}
                  treeCheckable
                  showCheckedStrategy={SHOW_CHILD}
                  placeholder={<FormattedMessage id="search" />}
                  treeNodeFilterProp="title"
                  showSearch
                  maxTagCount={15}
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
                valuePropName="checked"
                style={{ marginBottom: "5px" }}
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
                label={<FormattedMessage id="mentorship.skills" />}
                name="mentorSkills"
                className="mb-0"
              >
                <TreeSelect
                  className="custom-bubble-select-style"
                  treeData={skillOptions}
                  treeCheckable
                  showCheckedStrategy={SHOW_CHILD}
                  placeholder={<FormattedMessage id="search" />}
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
            </Col>
          </Fieldset>
        </Row>
        <div className="search-advancedSearchBtns">
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
        <Divider className="my-2" />
      </div>
    );
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      className="search-outerForm"
      layout="vertical"
      onKeyPress={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
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
                    <DoubleRightOutlined rotate="270" className="mr-2" />
                    <FormattedMessage id="basic.search" />
                  </>
                ) : (
                  <>
                    <DoubleRightOutlined rotate="90" className="mr-2" />
                    <FormattedMessage id="advanced.search" />
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
  anyMentorSkills: PropTypes.bool.isRequired,
  handleAnyMentorSkillsChange: PropTypes.func.isRequired,
};

export default SearchBarView;
