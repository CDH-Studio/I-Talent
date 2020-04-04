import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { Form, Col, Button, Input, Switch, Select } from "antd";
import "@ant-design/compatible/assets/index.css";
import { Row } from "antd";

function SearchBarView(props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const {
    handleSearch,
    skillOptions,
    branchOptions,
    classOptions,
    locationOptions
  } = props;

  const onFinish = values => {
    handleSearch(values);
  };

  let locale = props.intl.formatMessage({
    id: "language.code",
    defaultMessage: "en"
  });
  const searchLabel = props.intl.formatMessage({
    id: "button.search",
    defaultMessage: "Search"
  });
  const searchTitles = [
    "name",
    "skills",
    "branch",
    "location",
    "classification",
    "exFeeder"
  ];
  const labelArr = [
    props.intl.formatMessage({
      id: "advanced.search.form.name",
      defaultMessage: "Name"
    }),
    props.intl.formatMessage({
      id: "advanced.search.form.skills",
      defaultMessage: "Skills"
    }),
    props.intl.formatMessage({
      id: "advanced.search.form.branch",
      defaultMessage: "Branch"
    }),
    props.intl.formatMessage({
      id: "advanced.search.form.location",
      defaultMessage: "Location"
    }),
    props.intl.formatMessage({
      id: "advanced.search.form.classification",
      defaultMessage: "Classification"
    }),
    props.intl.formatMessage({
      id: "advanced.search.form.ex.feeder",
      defaultMessage: "Ex Feeder"
    })
  ];
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
        <Form.Item name={searchTitles[5]} label={labelArr[5]}>
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
}
export default injectIntl(SearchBarView);
