import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Form, Col, Button, Input, Switch, Select, Row } from "antd";
import "@ant-design/compatible/assets/index.css";
import SearchFilterError from "./searchFilterError/SearchFilterError";
import {
  IntlPropType,
  IdDescriptionPropType,
  NetworkErrorsPropType,
} from "../../customPropTypes";

const SearchBarView = ({
  handleSearch,
  skillOptions,
  branchOptions,
  classOptions,
  locationOptions,
  intl,
  urlSearchFieldValues,
  networkErrors,
}) => {
  const { Option } = Select;
  const [form] = Form.useForm();

  const onFinish = values => {
    handleSearch(values);
  };

  // Sets the default values of the form from the URL search params
  useEffect(() => {
    if (urlSearchFieldValues) {
      form.setFieldsValue(urlSearchFieldValues);
    }
  }, [form, urlSearchFieldValues]);

  const locale = intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });
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

  if (networkErrors && networkErrors.length) {
    return <SearchFilterError networkErrors={networkErrors} />;
  }

  return (
    <Form
      style={{ padding: "10px", overflow: "hidden" }}
      form={form}
      onFinish={onFinish}
    >
      <Row>
        <Form.Item label={labelArr[0]} name={searchTitles[0]}>
          <Input style={{ width: 230 }} placeholder={searchLabel} />
        </Form.Item>
        <Form.Item label={labelArr[1]} name={searchTitles[1]}>
          <Select
            style={{ width: 230 }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            mode="multiple"
            placeholder={searchLabel}
          >
            {skillOptions.map(value => {
              return (
                <Option key={value.id}>{value.description[locale]}</Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label={labelArr[2]} name={searchTitles[2]}>
          <Select
            style={{ width: 230 }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            mode="multiple"
            placeholder={searchLabel}
          >
            {branchOptions.map(value => {
              return (
                <Option key={value.description.en}>
                  {value.description[locale]}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label={labelArr[3]} name={searchTitles[3]}>
          <Select
            style={{ width: 230 }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            mode="multiple"
            placeholder={searchLabel}
          >
            {locationOptions.map(value => {
              return (
                <Option key={value.id}>{value.description[locale]}</Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label={labelArr[4]} name={searchTitles[4]}>
          <Select
            style={{ width: 230 }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            mode="multiple"
            placeholder={searchLabel}
          >
            {classOptions.map(value => {
              return <Option key={value.id}>{value.description}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name={searchTitles[5]}
          label={labelArr[5]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>{" "}
      </Row>

      <Row style={{ justifyContent: "center" }}>
        <Col>
          <Button shape="round" size="large" type="primary" htmlType="submit">
            {searchLabel}
          </Button>
        </Col>
      </Row>
    </Form>
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
  networkErrors: NetworkErrorsPropType.isRequired,
};

SearchBarView.defaultProps = {
  urlSearchFieldValues: undefined,
};

export default injectIntl(SearchBarView);
