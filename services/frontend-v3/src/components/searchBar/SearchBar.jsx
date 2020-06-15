import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
import handleError from "../../functions/handleError";
import SearchBarView from "./SearchBarView";

import config from "../../config";

const { backendAddress } = config;

const SearchBar = () => {
  const [anyMentorSkills, setAnyMentorSkills] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const history = useHistory();

  // get current language code
  const { locale } = useSelector((state) => state.settings);

  // Fetches options for branches select field in advanced search
  const getBranch = async () => {
    const results = await axios.get(`${backendAddress}api/option/getBranch`);
    setBranchOptions(
      results.data.filter((elem) => elem.description && elem.description.en)
    );
  };

  // Fetches options for locations select field in advanced search
  const getLocation = async () => {
    const results = await axios.get(`${backendAddress}api/option/getLocation`);
    setLocationOptions(results.data);
  };

  // Fetches options for classifications select field in advanced search
  const getClassification = async () => {
    const results = await axios.get(
      `${backendAddress}api/option/getGroupLevel`
    );
    setClassOptions(results.data);
  };

  const handleAnyMentorSkillsChange = (e) => {
    setAnyMentorSkills(e.target.checked);
  };

  // turns search values into query, redirects to results page with query
  const handleSearch = (unassignableValues) => {
    let values;
    if (unassignableValues.anyMentorSkills) {
      values = { ...unassignableValues, mentorshipSkills: undefined };
    } else {
      values = { ...unassignableValues, anyMentorSkills: undefined };
    }
    const query = queryString.stringify(values, { arrayFormat: "bracket" });
    const url = `/secured/results?${encodeURI(query)}`;
    history.push(url);
  };

  useEffect(() => {
    // Fetches options for skills select field in advanced search
    const getSkills = async () => {
      const dataTree = [];

      // Get user profile
      const url = `${backendAddress}api/option/getCategory`;
      const result = await axios.get(url);

      // Loop through all skill categories
      for (let i = 0; i < result.data.length; i += 1) {
        const parent = {
          title: result.data[i].description[locale],
          value: result.data[i].id,
          children: [],
        };

        dataTree.push(parent);
        // Loop through skills in each category
        for (let w = 0; w < result.data[i].skills.length; w += 1) {
          const child = {
            title: `${result.data[i].description[locale]}: ${result.data[i].skills[w].description[locale]}`,
            value: result.data[i].skills[w].id,
            key: result.data[i].skills[w].id,
          };
          dataTree[i].children.push(child);
        }
      }

      setSkillOptions(dataTree);
      return 1;
    };

    const updateState = async () => {
      Promise.all([
        getSkills(),
        getBranch(),
        getLocation(),
        getClassification(),
      ]).catch((error) => handleError(error, "redirect"));
    };

    updateState();
  }, [locale]);

  return (
    <SearchBarView
      locationOptions={locationOptions}
      skillOptions={skillOptions}
      classOptions={classOptions}
      branchOptions={branchOptions}
      handleSearch={handleSearch}
      anyMentorSkills={anyMentorSkills}
      handleAnyMentorSkillsChange={handleAnyMentorSkillsChange}
    />
  );
};

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default injectIntl(SearchBar);
