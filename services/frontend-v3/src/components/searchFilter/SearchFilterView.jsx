import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Form, Col, Button, Input, Switch, Select, Row } from "antd";
import "@ant-design/compatible/assets/index.css";
import { useSelector } from "react-redux";
import { IntlPropType, IdDescriptionPropType } from "../../customPropTypes";

const SearchBarView = ({
  handleSearch,
  skillOptions,
  branchOptions,
  classOptions,
  locationOptions,
  intl,
  urlSearchFieldValues,
}) => {
  const { Option } = Select;
  const [form] = Form.useForm();

  const styles = {
    w100: {
      width: "100%",
    },
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

  const { locale } = useSelector((state) => state.settings);
  const searchLabel = intl.formatMessage({
    id: "button.search",
    defaultMessage: "Search",
  });
  const searchTitles = [
    "name",
    "skills",
    "branch",
    "location",
    "classification",
    "exFeeder",
  ];
  const labelArr = [
    intl.formatMessage({
      id: "advanced.search.form.name",
      defaultMessage: "Name",
    }),
    intl.formatMessage({
      id: "advanced.search.form.skills",
      defaultMessage: "Skills",
    }),
    intl.formatMessage({
      id: "advanced.search.form.branch",
      defaultMessage: "Branch",
    }),
    intl.formatMessage({
      id: "advanced.search.form.location",
      defaultMessage: "Location",
    }),
    intl.formatMessage({
      id: "advanced.search.form.classification",
      defaultMessage: "Classification",
    }),
    intl.formatMessage({
      id: "advanced.search.form.ex.feeder",
      defaultMessage: "Ex Feeder",
    }),
  ];
  return (
    <row>
      <Col span={24}>
        <Form
          style={{ padding: "22px" }}
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row>
            <Form.Item
              label={labelArr[0]}
              name={searchTitles[0]}
              style={styles.w100}
            >
              <Input style={styles.w100} placeholder={searchLabel} />
            </Form.Item>
            <Form.Item
              style={styles.w100}
              label={labelArr[1]}
              name={searchTitles[1]}
            >
              <Select
                style={styles.w100}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
              >
                {skillOptions.map((value) => {
                  return (
                    <Option key={value.id}>{value.description[locale]}</Option>
                  );
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
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
            <Form.Item
              style={styles.w100}
              label={labelArr[3]}
              name={searchTitles[3]}
            >
              <Select
                style={styles.w100}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
              >
                {locationOptions.map((value) => {
                  return (
                    <Option key={value.id}>{value.description[locale]}</Option>
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
              >
                {classOptions.map((value) => {
                  return <Option key={value.id}>{value.description}</Option>;
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
            </Form.Item>{" "}
          </Row>

          <Row style={{ justifyContent: "center" }}>
            <Col>
              <Button
                shape="round"
                size="large"
                type="primary"
                htmlType="submit"
              >
                {searchLabel}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </row>
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
  intl: IntlPropType.isRequired,
  urlSearchFieldValues: PropTypes.shape({
    classification: PropTypes.array,
    location: PropTypes.array,
    skills: PropTypes.array,
    exFeeder: PropTypes.bool,
    name: PropTypes.string,
  }),
};

SearchBarView.defaultProps = {
  urlSearchFieldValues: undefined,
};

export default injectIntl(SearchBarView);
