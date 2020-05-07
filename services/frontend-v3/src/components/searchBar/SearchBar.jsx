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
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  // Fetches options for skills select field in advanced search
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

  // Fetches options for branches select field in advanced search
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

  //turns search values into query, redirects to results page with query
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
      handleSearch={handleSearch}
    ></SearchBarView>
  );
}

export default injectIntl(SearchBar);
