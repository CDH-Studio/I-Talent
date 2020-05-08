import React, { useState, useEffect } from "react";
import { Form, Col, Input, Switch, Select } from "antd";

import axios from "axios";
import queryString from "query-string";
import { injectIntl } from "react-intl";
import config from "../../config";
import SearchFilterView from "./SearchFilterView";

const { backendAddress } = config;
const { Option } = Select;

function SearchFilter(props) {
  const [expand, setExpand] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  const toggle = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    // Fetches options for skills select field in advanced search
    const getSkills = async () => {
      try {
        const results = await axios.get(
          `${backendAddress}api/option/getDevelopmentalGoals`
        );
        return results.data;
      } catch (error) {
        console.log(error);
        return 0;
      }
    };

    // Fetches options for branches select field in advanced search
    const getBranch = async () => {
      try {
        const results = await axios.get(
          `${backendAddress}api/option/getBranch`
        );
        return results.data.filter(
          (elem) => elem.description && elem.description.en
        );
      } catch (error) {
        console.log(error);
        return 0;
      }
    };

    // Fetches options for locations select field in advanced search
    const getLocation = async () => {
      try {
        const results = await axios.get(
          `${backendAddress}api/option/getLocation`
        );

        return results.data;
      } catch (error) {
        console.log(error);
        return 0;
      }
    };

    // Fetches options for classifications select field in advanced search
    const getClassification = async () => {
      try {
        const results = await axios.get(
          `${backendAddress}api/option/getGroupLevel`
        );

        return results.data;
      } catch (error) {
        console.log(error);
        return 0;
      }
    };

    const updateState = async () => {
      const skills = await getSkills();
      const branches = await getBranch();
      const locations = await getLocation();
      const classifications = await getClassification();
      setSkillOptions(skills);
      setBranchOptions(branches);
      setLocationOptions(locations);
      setClassOptions(classifications);
    };

    updateState();
  }, []);

  // page with query
  const handleSearch = (values) => {
    let query;
    query = queryString.stringify(values, { arrayFormat: "bracket" });
    const url = `/secured/results?${encodeURI(query)}`;
    props.history.push(url);
    window.location.reload();
  };

  return (
    <SearchFilterView
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      history={props.history}
      skillOptions={skillOptions}
      branchOptions={branchOptions}
      locationOptions={locationOptions}
      classOptions={classOptions}
      handleSearch={handleSearch}
      toggle={toggle}
    />
  );
}

export default injectIntl(SearchFilter);
