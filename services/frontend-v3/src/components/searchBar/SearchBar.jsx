import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { Col, Input, Switch, Select } from "antd";
import axios from "axios";
import config from "../../config";
import queryString from "query-string";
import { injectIntl } from "react-intl";
import SearchBarView from "./SearchBarView";

const backendAddress = config.backendAddress;
const { Option } = Select;

function SearchBar(props) {
  const [expand, setExpand] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  const toggle = () => {
    setExpand(!expand);
  };

  //Fetches options for skills select field in advanced search
  const getSkills = async () => {
    try {
      let results = await axios.get(
        backendAddress + "api/option/getDevelopmentalGoals"
      );
      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  //Fetches options for branches select field in advanced search
  const getBranch = async () => {
    try {
      let results = await axios.get(backendAddress + "api/option/getBranch");
      return results.data.filter(
        (elem) => elem.description && elem.description.en
      );
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  //Fetches options for locations select field in advanced search
  const getLocation = async () => {
    try {
      let results = await axios.get(backendAddress + "api/option/getLocation");

      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  //Fetches options for classifications select field in advanced search
  const getClassification = async () => {
    try {
      let results = await axios.get(
        backendAddress + "api/option/getGroupLevel"
      );

      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  //Creates the six fields for advanced search, along with their bilingual titles
  const getFields = (data) => {
    const count = expand ? 6 : 0;
    const children = [];
    let fieldCounter = 0;
    let locale = props.intl.formatMessage({
      id: "language.code",
      defaultMessage: "en",
    });
    const searchLabel = props.intl.formatMessage({
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
      props.intl.formatMessage({
        id: "advanced.search.form.name",
        defaultMessage: "Name",
      }),
      props.intl.formatMessage({
        id: "advanced.search.form.skills",
        defaultMessage: "Skills",
      }),
      props.intl.formatMessage({
        id: "advanced.search.form.branch",
        defaultMessage: "Branch",
      }),
      props.intl.formatMessage({
        id: "advanced.search.form.location",
        defaultMessage: "Location",
      }),
      props.intl.formatMessage({
        id: "advanced.search.form.classification",
        defaultMessage: "Classification",
      }),
      props.intl.formatMessage({
        id: "advanced.search.form.ex.feeder",
        defaultMessage: "Ex Feeder",
      }),
    ];
    for (let i = 0; i < 10; i++) {
      fieldCounter++;
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? "block" : "none" }}>
          {fieldCounter === 1 ? (
            <Form.Item label={labelArr[i]} name={searchTitles[i]}>
              <Input style={{ width: 220 }} placeholder={searchLabel} />
            </Form.Item>
          ) : fieldCounter === 6 ? (
            <Form.Item name={searchTitles[i]} label={labelArr[i]}>
              <Switch />
            </Form.Item>
          ) : fieldCounter === 2 ? (
            <Form.Item label={labelArr[i]} name={searchTitles[i]}>
              <Select
                style={{ width: 220 }}
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
          ) : fieldCounter === 3 ? (
            <Form.Item label={labelArr[i]} name={searchTitles[i]}>
              <Select
                style={{ width: 220 }}
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
          ) : fieldCounter === 4 ? (
            <Form.Item label={labelArr[i]} name={searchTitles[i]}>
              <Select
                style={{ width: 220 }}
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
          ) : (
            <Form.Item label={labelArr[i]} name={searchTitles[i]}>
              <Select
                style={{ width: 220 }}
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
          )}
        </Col>
      );
    }

    return children;
  };

  //turns search values inputted into children array into query, redirects to results
  //page with query
  const handleSearch = (values) => {
    var query;
    query = queryString.stringify(values, { arrayFormat: "bracket" });
    let url = "/secured/results?" + encodeURI(query);
    props.history.push(url);
  };

  useEffect(() => {
    const updateState = async () => {
      let skills = await getSkills();
      let branches = await getBranch();
      let locations = await getLocation();
      let classifications = await getClassification();
      setSkillOptions(skills);
      setBranchOptions(branches);
      setLocationOptions(locations);
      setClassOptions(classifications);
    };
    updateState();
  }, []);

  return (
    <SearchBarView
      changeLanguage={props.changeLanguage}
      locationOptions={locationOptions}
      skillOptions={skillOptions}
      classOptions={classOptions}
      branchOptions={branchOptions}
      getFields={getFields}
      handleSearch={handleSearch}
      toggle={toggle}
    ></SearchBarView>
  );
}

export default injectIntl(SearchBar);
