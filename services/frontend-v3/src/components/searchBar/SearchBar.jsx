import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { injectIntl } from "react-intl";
import handleError from "../../functions/handleError";
import SearchBarView from "./SearchBarView";

import config from "../../config";
const { backendAddress } = config;

const SearchBar = ({ history }) => {
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  // Fetches options for skills select field in advanced search
  const getSkills = async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/option/getDevelopmentalGoals`
      );
      setSkillOptions(results.data);
    } catch (error) {
      throw error;
    }
  };

  // Fetches options for branches select field in advanced search
  const getBranch = async () => {
    try {
      const results = await axios.get(`${backendAddress}api/option/getBranch`);
      setBranchOptions(
        results.data.filter(elem => elem.description && elem.description.en)
      );
    } catch (error) {
      throw error;
    }
  };

  // Fetches options for locations select field in advanced search
  const getLocation = async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/option/getLocation`
      );
      setLocationOptions(results.data);
      throw error;
    }
  };

  // Fetches options for classifications select field in advanced search
  const getClassification = async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/option/getGroupLevel`
      );
      setClassOptions(results.data);
    } catch (error) {
      throw error;
    }
  };

  // turns search values into query, redirects to results page with query
  const handleSearch = values => {
    const query = queryString.stringify(values, { arrayFormat: "bracket" });
    const url = `/secured/results?${encodeURI(query)}`;
    history.push(url);
  };

  useEffect(() => {
    const updateState = async () => {
      Promise.all([
        getSkills(),
        getBranch(),
        getLocation(),
        getClassification(),
      ]).catch(error => handleError(error, "redirect"));
    };

    updateState();
  }, []);

  return (
    <SearchBarView
      locationOptions={locationOptions}
      skillOptions={skillOptions}
      classOptions={classOptions}
      branchOptions={branchOptions}
      handleSearch={handleSearch}
    />
  );
};

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default injectIntl(SearchBar);
