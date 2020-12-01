import { useEffect } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
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
      >
        {/* name */}
        <Form.Item
          label={labelArr[0]}
          name={searchTitles[0]}
          className="search-w100"
        >
          <Input className="search-w100" />
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
          >
            {classOptions.map((value) => {
              return <Option key={value.id}>{value.name}</Option>;
            })}
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
          >
            {branchOptions.map((value) => {
              return <Option key={value}>{value}</Option>;
            })}
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
          />
        </Form.Item>

        {/* mentor skills */}
        <Form.Item
          className="search-w100"
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
          />
        </Form.Item>
        <Form.Item
          className="search-w100"
          name={searchTitles[6]}
          label={labelArr[6]}
          valuePropName="checked"
        >
          <Checkbox onChange={handleAnyMentorSkillsChange}>
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
          <Switch />
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
