import React, { useState, useEffect, useCallback } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import axios from "../../axios-instance";
import handleError from "../../functions/handleError";
import SearchBarView from "./SearchBarView";

const SearchBar = () => {
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const history = useHistory();

  const { locale } = useSelector((state) => state.settings);

  // Fetches options for skills select field in advanced search
  const getSkills = useCallback(async () => {
    const results = await axios.get(
      `api/option/developmentalGoals?language=${locale}`
    );
    setSkillOptions(results.data);
  }, [locale]);

  // Fetches options for branches select field in advanced search
  const getBranch = useCallback(async () => {
    const results = await axios.get(`api/option/branches?language=${locale}`);
    setBranchOptions(results.data);
  }, [locale]);

  // Fetches options for locations select field in advanced search
  const getLocation = useCallback(async () => {
    const results = await axios.get(`api/option/locations?language=${locale}`);
    setLocationOptions(results.data);
  }, [locale]);

  // Fetches options for classifications select field in advanced search
  const getClassification = async () => {
    const results = await axios.get(`api/option/classifications`);
    setClassOptions(results.data);
  };

  // turns search values into query, redirects to results page with query
  const handleSearch = (values) => {
    const query = queryString.stringify(values, { arrayFormat: "bracket" });
    const url = `/secured/results?${query}`;

    if (query !== "") {
      history.push(url);
    }
  };

  useEffect(() => {
    const updateState = async () => {
      Promise.all([
        getSkills(),
        getBranch(),
        getLocation(),
        getClassification(),
      ]).catch((error) => handleError(error, "redirect"));
    };

    updateState();
  }, [getBranch, getLocation, getSkills, locale]);

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

export default injectIntl(SearchBar);
