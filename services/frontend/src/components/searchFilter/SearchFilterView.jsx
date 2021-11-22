import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Switch,
  TreeSelect,
  Typography,
} from "antd";
import PropTypes from "prop-types";

import { IdDescriptionPropType } from "../../utils/customPropTypes";
import CustomDropdown from "../formItems/CustomDropdown";

import "./SearchFilterView.less";

const { SHOW_CHILD } = TreeSelect;
const { Title, Text } = Typography;

const SearchFilterView = ({
  handleSearch,
  skillOptions,
  branchOptions,
  classOptions,
  locationOptions,
  urlSearchFieldValues,
  handleAnyMentorSkillsChange,
  anyMentorSkills,
}) => {
  const [form] = Form.useForm();
  const intl = useIntl();

  const onFinish = (values) => {
    handleSearch(values);
  };

  // Sets the default values of the form from the URL search params
  useEffect(() => {
    if (urlSearchFieldValues) {
      form.resetFields();
      form.setFieldsValue(urlSearchFieldValues);
    }
  }, [form, urlSearchFieldValues]);

  return (
    <div className="search-searchSideBar">
      <Title className="search-searchHeader" level={2}>
        <SettingOutlined className="search-searchHeaderIcon" />
        <FormattedMessage id="search.filters" />
      </Title>
      <Text>
        <FormattedMessage id="sidebar.search.description" />
      </Text>
      <Form
        className="search-form"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onKeyPress={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        {/* name */}
        <Form.Item
          className="search-w100"
          label={intl.formatMessage({ id: "name" })}
          name="name"
        >
          <Input
            className="search-w100"
            placeholder={intl.formatMessage({ id: "search" })}
          />
        </Form.Item>

        {/* classification */}
        <Form.Item
          className="search-w100"
          label={<FormattedMessage id="classification" />}
          name="classifications"
        >
          <CustomDropdown
            ariaLabel={intl.formatMessage({
              id: "classification",
            })}
            initialValueId={
              urlSearchFieldValues && urlSearchFieldValues.classifications
            }
            isMulti
            isSearchable
            maxSelectedOptions={3}
            name="classifications"
            options={classOptions}
            placeholderText={<FormattedMessage id="type.to.search" />}
          />
        </Form.Item>

        {/* location */}
        <Form.Item
          className="search-w100"
          label={<FormattedMessage id="location" />}
          name="locations"
        >
          <CustomDropdown
            ariaLabel={intl.formatMessage({
              id: "location",
            })}
            initialValueId={
              urlSearchFieldValues && urlSearchFieldValues.locations
            }
            isMulti
            isSearchable
            maxSelectedOptions={3}
            name="locations"
            options={locationOptions}
            placeholderText={<FormattedMessage id="type.to.search" />}
          />
        </Form.Item>

        {/* branch */}
        <Form.Item
          className="search-w100"
          label={<FormattedMessage id="branch" />}
          name="branches"
        >
          <CustomDropdown
            ariaLabel={intl.formatMessage({
              id: "branch",
            })}
            initialValueId={
              urlSearchFieldValues && urlSearchFieldValues.branches
            }
            isMulti
            isSearchable
            maxSelectedOptions={3}
            name="branches"
            options={branchOptions}
            placeholderText={<FormattedMessage id="type.to.search" />}
          />
        </Form.Item>

        {/* skills */}
        <Form.Item
          className="search-w100"
          label={<FormattedMessage id="skills" />}
          name="skills"
        >
          <TreeSelect
            aria-autocomplete="none"
            className="search-w100"
            maxTagCount={3}
            mode="multiple"
            placeholder={<FormattedMessage id="type.to.search" />}
            showCheckedStrategy={SHOW_CHILD}
            showSearch
            treeCheckable
            treeData={skillOptions}
            treeNodeFilterProp="title"
          />
        </Form.Item>

        {/* mentor skills */}
        <Form.Item
          className="search-w100 mentorship-dropdown"
          label={<FormattedMessage id="mentorship.skills" />}
          name="mentorSkills"
        >
          <TreeSelect
            aria-autocomplete="none"
            className="search-w100"
            disabled={anyMentorSkills}
            maxTagCount={3}
            mode="multiple"
            placeholder={<FormattedMessage id="type.to.search" />}
            showCheckedStrategy={SHOW_CHILD}
            showSearch
            treeCheckable
            treeData={skillOptions}
            treeNodeFilterProp="title"
          />
        </Form.Item>
        <Form.Item
          className="search-w100"
          name="anyMentorSkills"
          valuePropName="checked"
        >
          <Checkbox
            aria-label={intl.formatMessage({ id: "select.any.mentors" })}
            onChange={handleAnyMentorSkillsChange}
          >
            <FormattedMessage id="select.any.mentors" />
          </Checkbox>
        </Form.Item>

        {/* exFeeder */}
        <Form.Item
          className="search-w100"
          label={intl.formatMessage({ id: "search.filter.exfeeder" })}
          name="exFeeder"
          valuePropName="checked"
        >
          <Switch
            aria-label={intl.formatMessage({ id: "search.filter.exfeeder" })}
            role="switch"
          />
        </Form.Item>
        <Button
          className="search-w100"
          htmlType="submit"
          size="large"
          type="primary"
        >
          <ReloadOutlined className="mr-1" />
          <FormattedMessage id="search" />
        </Button>
      </Form>
    </div>
  );
};

SearchFilterView.propTypes = {
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
  locationOptions: IdDescriptionPropType.isRequired,
  skillOptions: IdDescriptionPropType.isRequired,
  urlSearchFieldValues: PropTypes.shape({
    branches: PropTypes.arrayOf(PropTypes.string),
    classifications: PropTypes.arrayOf(PropTypes.string),
    exFeeder: PropTypes.bool,
    locations: PropTypes.arrayOf(PropTypes.string),
    mentorSkills: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }),
};

SearchFilterView.defaultProps = {
  urlSearchFieldValues: undefined,
};

export default SearchFilterView;
