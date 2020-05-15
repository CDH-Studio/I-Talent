import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { injectIntl } from "react-intl";
import config from "../../config";
import SearchBarView from "./SearchBarView";

const { backendAddress } = config;

const SearchBar = ({ history }) => {
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [networkError, setNetworkError] = useState(null);

  // Fetches options for skills select field in advanced search
  const getSkills = async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/option/getDevelopmentalGoals`
      );
      return results.data;
    } catch (error) {
      setNetworkError(error);
      // eslint-disable-next-line no-console
      console.log(error);
      return [];
    }
  };

  // Fetches options for branches select field in advanced search
  const getBranch = async () => {
    try {
      const results = await axios.get(`${backendAddress}api/option/getBranch`);
      return results.data.filter(
        elem => elem.description && elem.description.en
      );
    } catch (error) {
      setNetworkError(error);
      // eslint-disable-next-line no-console
      console.log(error);
      return [];
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
      setNetworkError(error);
      // eslint-disable-next-line no-console
      console.log(error);
      return [];
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
      setNetworkError(error);
      // eslint-disable-next-line no-console
      console.log(error);
      return [];
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

  return (
    <SearchBarView
      locationOptions={locationOptions}
      skillOptions={skillOptions}
      classOptions={classOptions}
      branchOptions={branchOptions}
      handleSearch={handleSearch}
      networkError={networkError}
    />
  );
};

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default injectIntl(SearchBar);
