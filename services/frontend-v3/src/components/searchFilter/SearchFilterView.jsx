import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Form, Button, Input, Switch, Select, Typography } from "antd";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import { IdDescriptionPropType } from "../../customPropTypes";

const { Title, Text } = Typography;

const SearchBarView = ({
  handleSearch,
  skillOptions,
  branchOptions,
  classOptions,
  locationOptions,
  urlSearchFieldValues,
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
    "skills",
    "branches",
    "locations",
    "classifications",
    "exFeeder",
  ];
  const labelArr = [
    <FormattedMessage id="advanced.search.form.name" />,
    <FormattedMessage id="advanced.search.form.skills" />,
    <FormattedMessage id="advanced.search.form.branch" />,
    <FormattedMessage id="advanced.search.form.location" />,
    <FormattedMessage id="advanced.search.form.classification" />,
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
        <Form.Item
          label={labelArr[0]}
          name={searchTitles[0]}
          style={styles.w100}
        >
          <Input style={styles.w100} />
        </Form.Item>
        <Form.Item
          style={styles.w100}
          label={labelArr[1]}
          name={searchTitles[1]}
        >
          <Select
            style={styles.w100}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            mode="multiple"
            maxTagCount={3}
          >
            {skillOptions.map((value) => {
              return <Option key={value.id}>{value.name}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          style={styles.w100}
          label={labelArr[2]}
          name={searchTitles[2]}
        >
          <Select
            style={styles.w100}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            mode="multiple"
            maxTagCount={3}
          >
            {branchOptions.map((value) => {
              return <Option key={value}>{value}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          style={styles.w100}
          label={labelArr[3]}
          name={searchTitles[3]}
        >
          <Select
            style={styles.w100}
            filterOption={(input, option) =>
              option.children
                .join("")
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            mode="multiple"
            maxTagCount={3}
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
        <Form.Item
          style={styles.w100}
          label={labelArr[4]}
          name={searchTitles[4]}
        >
          <Select
            style={styles.w100}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            mode="multiple"
            maxTagCount={3}
          >
            {classOptions.map((value) => {
              return <Option key={value.id}>{value.name}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          style={styles.w100}
          name={searchTitles[5]}
          label={labelArr[5]}
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
  urlSearchFieldValues: PropTypes.shape({
    classification: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.string),
    exFeeder: PropTypes.bool,
    name: PropTypes.string,
  }),
};

SearchBarView.defaultProps = {
  urlSearchFieldValues: undefined,
};

export default SearchBarView;
