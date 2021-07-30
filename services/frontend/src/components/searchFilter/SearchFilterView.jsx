import { useEffect } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Form,
  Button,
  Input,
  Switch,
  Typography,
  Checkbox,
  TreeSelect,
} from "antd";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
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
      <Title level={2} className="search-searchHeader">
        <SettingOutlined className="search-searchHeaderIcon" />
        <FormattedMessage id="search.filters" />
      </Title>
      <Text>
        <FormattedMessage id="sidebar.search.description" />
      </Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="search-form"
        onKeyPress={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        {/* name */}
        <Form.Item
          label={intl.formatMessage({ id: "name" })}
          name="name"
          className="search-w100"
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
            placeholderText={<FormattedMessage id="type.to.search" />}
            options={classOptions}
            initialValueId={
              urlSearchFieldValues && urlSearchFieldValues.classifications
            }
            isSearchable
            isMulti
            maxSelectedOptions={3}
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
            placeholderText={<FormattedMessage id="type.to.search" />}
            options={locationOptions}
            initialValueId={
              urlSearchFieldValues && urlSearchFieldValues.locations
            }
            isSearchable
            isMulti
            maxSelectedOptions={3}
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
            placeholderText={<FormattedMessage id="type.to.search" />}
            options={branchOptions}
            initialValueId={
              urlSearchFieldValues && urlSearchFieldValues.branches
            }
            isSearchable
            isMulti
            maxSelectedOptions={3}
          />
        </Form.Item>

        {/* skills */}
        <Form.Item
          className="search-w100"
          label={<FormattedMessage id="skills" />}
          name="skills"
        >
          <TreeSelect
            className="search-w100"
            treeData={skillOptions}
            treeCheckable
            treeNodeFilterProp="title"
            showCheckedStrategy={SHOW_CHILD}
            showSearch
            mode="multiple"
            maxTagCount={3}
            aria-autocomplete="none"
            placeholder={<FormattedMessage id="type.to.search" />}
          />
        </Form.Item>

        {/* mentor skills */}
        <Form.Item
          className="search-w100 mentorship-dropdown"
          label={<FormattedMessage id="mentorship.skills" />}
          name="mentorSkills"
        >
          <TreeSelect
            className="search-w100"
            treeData={skillOptions}
            treeCheckable
            treeNodeFilterProp="title"
            showCheckedStrategy={SHOW_CHILD}
            showSearch
            mode="multiple"
            maxTagCount={3}
            disabled={anyMentorSkills}
            aria-autocomplete="none"
            placeholder={<FormattedMessage id="type.to.search" />}
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
          name="exFeeder"
          label={intl.formatMessage({ id: "search.filter.exfeeder" })}
          valuePropName="checked"
        >
          <Switch
            role="switch"
            aria-label={intl.formatMessage({ id: "search.filter.exfeeder" })}
          />
        </Form.Item>
        <Button
          className="search-w100"
          size="large"
          type="primary"
          htmlType="submit"
        >
          <ReloadOutlined className="mr-1" />
          <FormattedMessage id="search" />
        </Button>
      </Form>
    </div>
  );
};

SearchFilterView.propTypes = {
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
  locationOptions: IdDescriptionPropType.isRequired,
  skillOptions: IdDescriptionPropType.isRequired,
  handleSearch: PropTypes.func.isRequired,
  urlSearchFieldValues: PropTypes.shape({
    branches: PropTypes.arrayOf(PropTypes.string),
    classifications: PropTypes.arrayOf(PropTypes.string),
    mentorSkills: PropTypes.arrayOf(PropTypes.string),
    locations: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.string),
    exFeeder: PropTypes.bool,
    name: PropTypes.string,
  }),
  anyMentorSkills: PropTypes.bool.isRequired,
  handleAnyMentorSkillsChange: PropTypes.func.isRequired,
};

SearchFilterView.defaultProps = {
  urlSearchFieldValues: undefined,
};

export default SearchFilterView;
