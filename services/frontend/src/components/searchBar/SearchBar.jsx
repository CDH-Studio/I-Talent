import { useCallback, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import handleError from "../../functions/handleError";
import useAxios from "../../utils/useAxios";
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
            key: skill.id,
            title: `${category.name}: ${skill.name}`,
            value: skill.id,
          });
        }
      });

      return {
        checkable: false,
        children,
        disableCheckbox: true,
        selectable: false,
        title: category.name,
        value: category.id,
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
    const searchFilter = values;

    if (!searchFilter.anyMentorSkills) {
      delete searchFilter.anyMentorSkills;
    }

    if (!searchFilter.exFeeder) {
      delete searchFilter.exFeeder;
    }

    if (searchFilter.anyMentorSkills) {
      delete searchFilter.mentorSkills;
    }

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
      anyMentorSkills={anyMentorSkills}
      branchOptions={branchOptions}
      classOptions={classOptions}
      handleAnyMentorSkillsChange={handleAnyMentorSkillsChange}
      handleSearch={handleSearch}
      locationOptions={locationOptions}
      skillOptions={skillOptions}
    />
  );
};

export default injectIntl(SearchBar);
