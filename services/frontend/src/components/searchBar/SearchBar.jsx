import React, { useState, useEffect, useCallback } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import useAxios from "../../utils/useAxios";
import handleError from "../../functions/handleError";
import SearchBarView from "./SearchBarView";

const SearchBar = () => {
  const [anyMentorSkills, setAnyMentorSkills] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const history = useHistory();
  const axios = useAxios();

  const { locale } = useSelector((state) => state.settings);

  /**
   * Get all skill options
   *
   * generate the dataTree of skills and skill categories for the TreeSelect
   */
  const getSkills = useCallback(async () => {
    const [categoriesResult, skillsResults] = await Promise.all([
      axios.get(`api/option/categories?language=${locale}`),
      axios.get(`api/option/skills?language=${locale}`),
    ]);

    // Loop through all skill categories
    const dataTree = categoriesResult.data.map((category) => {
      const children = [];

      skillsResults.data.forEach((skill) => {
        if (skill.categoryId === category.id) {
          children.push({
            title: `${category.name}: ${skill.name}`,
            value: skill.id,
            key: skill.id,
          });
        }
      });

      return {
        title: category.name,
        value: category.id,
        children,
      };
    });

    setSkillOptions(dataTree);
  }, [axios, locale]);

  // Fetches options for branches select field in advanced search
  const getBranch = useCallback(async () => {
    const results = await axios.get(`api/option/branches?language=${locale}`);
    setBranchOptions(results.data);
  }, [axios, locale]);

  // Fetches options for locations select field in advanced search
  const getLocation = useCallback(async () => {
    const results = await axios.get(`api/option/locations?language=${locale}`);
    setLocationOptions(results.data);
  }, [axios, locale]);

  // Fetches options for classifications select field in advanced search
  const getClassification = useCallback(async () => {
    const results = await axios.get(`api/option/classifications`);
    setClassOptions(results.data);
  }, [axios]);

  // turns search values into query, redirects to results page with query
  const handleSearch = (values) => {
    const query = queryString.stringify(values, { arrayFormat: "bracket" });
    const url = `/results?${query}`;

    if (query && query.length > 0) {
      history.push(url);
    }
  };

  const handleAnyMentorSkillsChange = (e) => {
    setAnyMentorSkills(e.target.checked);
  };

  useEffect(() => {
    const updateState = async () => {
      Promise.all([
        getSkills(),
        getBranch(),
        getLocation(),
        getClassification(),
      ]).catch((error) => handleError(error, "redirect", history));
    };

    updateState();
  }, [getBranch, getClassification, getLocation, getSkills, locale, history]);

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

export default injectIntl(SearchBar);
