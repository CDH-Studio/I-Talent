import { useEffect } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Form,
  Button,
  Input,
  Switch,
  Select,
  Typography,
  Checkbox,
  TreeSelect,
} from "antd";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import { IdDescriptionPropType } from "../../utils/customPropTypes";
import filterOption from "../../functions/filterSelectInput";
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
  const { Option } = Select;
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

  const searchLabel = <FormattedMessage id="search" />;
  const searchTitles = [
    "name",
    "classifications",
    "locations",
    "branches",
    "skills",
    "mentorSkills",
    "anyMentorSkills",
    "exFeeder",
  ];
  const labelArr = [
    <FormattedMessage id="name" />,
    <FormattedMessage id="classification" />,
    <FormattedMessage id="work.location" />,
    <FormattedMessage id="branch" />,
    <FormattedMessage id="skills" />,
    <FormattedMessage id="mentorship.skills" />,
    null,
    <FormattedMessage id="ex.feeder" />,
  ];
  const ariaLabels = [
    intl.formatMessage({ id: "search.filter.person.name" }),
    intl.formatMessage({
      id: "search.filter.classification",
    }),
    intl.formatMessage({ id: "search.filter.location" }),
    intl.formatMessage({ id: "search.filter.branch" }),
    intl.formatMessage({ id: "search.filter.skills" }),
    intl.formatMessage({ id: "search.filter.mentorship.skills" }),
    intl.formatMessage({ id: "search.filter.any.mentors" }),
    intl.formatMessage({ id: "search.filter.exfeeder" }),
  ];

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
          label={labelArr[0]}
          name={searchTitles[0]}
          className="search-w100"
        >
          <Input
            className="search-w100"
            aria-label={ariaLabels[0]}
            role="textbox"
          />
        </Form.Item>

        {/* classification */}
        <Form.Item
          className="search-w100"
          label={labelArr[1]}
          name={searchTitles[1]}
        >
          <Select
            className="search-w100"
            mode="multiple"
            maxTagCount={3}
            filterOption={filterOption}
            aria-label={ariaLabels[1]}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            role="textbox"
            dropdownRender={(menu) => (
              <div
                id="classification_listbox"
                role="listbox"
                aria-multiselectable="true"
              >
                {menu}
              </div>
            )}
          >
            {classOptions.map((value) => (
              <Option role="option" aria-selected={false} key={value.id}>
                {value.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* location */}
        <Form.Item
          className="search-w100"
          label={labelArr[2]}
          name={searchTitles[2]}
        >
          <Select
            className="search-w100"
            mode="multiple"
            maxTagCount={3}
            filterOption={filterOption}
            aria-label={ariaLabels[2]}
            aria-autocomplete="list"
            aria-owns="location_listbox"
            aria-haspopup="listbox"
            role="combobox"
            dropdownRender={(menu) => (
              <div
                id="location_listbox"
                role="listbox"
                aria-multiselectable="true"
              >
                {menu}
              </div>
            )}
          >
            {locationOptions.map(
              ({ streetNumber, streetName, city, province, id }) => (
                <Option role="option" key={id}>
                  {streetNumber} {streetName}, {city}, {province}
                </Option>
              )
            )}
          </Select>
        </Form.Item>

        {/* branch */}
        <Form.Item
          className="search-w100"
          label={labelArr[3]}
          name={searchTitles[3]}
        >
          <Select
            className="search-w100"
            mode="multiple"
            maxTagCount={3}
            filterOption={filterOption}
            aria-label={ariaLabels[3]}
            aria-autocomplete="list"
            aria-expanded="false"
            aria-haspopup="listbox"
            aria-owns="branch_listbox"
            role="combobox"
            dropdownRender={(menu) => (
              <div
                id="branch_listbox"
                role="listbox"
                aria-multiselectable="true"
              >
                {menu}
              </div>
            )}
          >
            {branchOptions.map((value) => (
              <Option role="option" key={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* skills */}
        <Form.Item
          className="search-w100"
          label={labelArr[4]}
          name={searchTitles[4]}
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
          />
        </Form.Item>

        {/* mentor skills */}
        <Form.Item
          className="search-w100 mentorship-dropdown"
          label={labelArr[5]}
          name={searchTitles[5]}
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
          />
        </Form.Item>
        <Form.Item
          className="search-w100"
          name={searchTitles[6]}
          label={labelArr[6]}
          valuePropName="checked"
        >
          <Checkbox
            role="checkbox"
            aria-label={ariaLabels[6]}
            onChange={handleAnyMentorSkillsChange}
          >
            <FormattedMessage id="select.any.mentors" />
          </Checkbox>
        </Form.Item>

        {/* exFeeder */}
        <Form.Item
          className="search-w100"
          name={searchTitles[7]}
          label={labelArr[7]}
          valuePropName="checked"
        >
          <Switch role="switch" aria-label={ariaLabels[7]} />
        </Form.Item>
        <Button
          className="search-w100"
          size="large"
          type="primary"
          htmlType="submit"
        >
          <ReloadOutlined />
          <span>{searchLabel}</span>
        </Button>
      </Form>
    </div>
  );
};

SearchFilterView.propTypes = {
  branchOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  classOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  locationOptions: IdDescriptionPropType.isRequired,
  skillOptions: IdDescriptionPropType.isRequired,
  handleSearch: PropTypes.func.isRequired,
  urlSearchFieldValues: PropTypes.shape({
    classification: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.arrayOf(PropTypes.string),
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
