import React, { useEffect } from "react";
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

const { SHOW_CHILD } = TreeSelect;
const { Title, Text } = Typography;

const SearchBarView = ({
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

  const styles = {
    w100: {
      width: "100%",
    },
    searchHeader: {
      fontSize: "1.2em",
    },
    searchHeaderIcon: {
      fontSize: "0.9em",
      marginRight: "4px",
      color: "#3CBAB3",
    },
    searchSideBar: { padding: "22px" },
    form: { paddingTop: "10px" },
  };

  const onFinish = (values) => {
    handleSearch(values);
  };

  // Sets the default values of the form from the URL search params
  useEffect(() => {
    if (urlSearchFieldValues) {
      form.setFieldsValue(urlSearchFieldValues);
    }
  }, [form, urlSearchFieldValues]);

  const searchLabel = <FormattedMessage id="button.search" />;
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
    <FormattedMessage id="advanced.search.form.name" />,
    <FormattedMessage id="advanced.search.form.classification" />,
    <FormattedMessage id="advanced.search.form.location" />,
    <FormattedMessage id="advanced.search.form.branch" />,
    <FormattedMessage id="advanced.search.form.skills" />,
    <FormattedMessage id="advanced.search.form.mentorship.skills" />,
    null,
    <FormattedMessage id="advanced.search.form.ex.feeder" />,
  ];
  return (
    <div style={styles.searchSideBar}>
      <Title level={2} style={styles.searchHeader}>
        <SettingOutlined style={styles.searchHeaderIcon} />
        <FormattedMessage id="sidebar.search.title" />
      </Title>
      <Text>
        <FormattedMessage id="sidebar.search.description" />
      </Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={styles.form}
      >
        {/* name */}
        <Form.Item
          label={labelArr[0]}
          name={searchTitles[0]}
          style={styles.w100}
        >
          <Input style={styles.w100} />
        </Form.Item>

        {/* classification */}
        <Form.Item
          style={styles.w100}
          label={labelArr[1]}
          name={searchTitles[1]}
        >
          <Select
            style={styles.w100}
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
          style={styles.w100}
          label={labelArr[2]}
          name={searchTitles[2]}
        >
          <Select
            style={styles.w100}
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
          style={styles.w100}
          label={labelArr[3]}
          name={searchTitles[3]}
        >
          <Select
            style={styles.w100}
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
          style={styles.w100}
          label={labelArr[4]}
          name={searchTitles[4]}
        >
          <TreeSelect
            style={styles.w100}
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
          style={styles.w100}
          label={labelArr[5]}
          name={searchTitles[5]}
        >
          <TreeSelect
            style={styles.w100}
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
          style={styles.w100}
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
          style={styles.w100}
          name={searchTitles[7]}
          label={labelArr[7]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Button
          style={styles.w100}
          shape="round"
          size="large"
          type="primary"
          htmlType="submit"
        >
          <ReloadOutlined style={{ marginRight: "5px" }} />
          {searchLabel}
        </Button>
      </Form>
    </div>
  );
};

SearchBarView.propTypes = {
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

SearchBarView.defaultProps = {
  urlSearchFieldValues: undefined,
};

export default SearchBarView;
