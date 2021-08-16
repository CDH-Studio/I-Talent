import queryString from "query-string";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import handleError from "../../functions/handleError";
import useAxios from "../../utils/useAxios";
import SearchFilterView from "./SearchFilterView";

const SearchFilter = () => {
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [urlSearchFieldValues, setUrlSearchFieldValues] = useState({
    branches: [],
    classifications: [],
    exFeeder: false,
    locations: [],
    mentorSkills: [],
    name: "",
    skills: [],
  });
  const [anyMentorSkills, setAnyMentorSkills] = useState(false);
  const axios = useAxios();
  const history = useHistory();
  const { locale } = useSelector((state) => state.settings);

  /**
   * Updates the state value {urlSearchFieldValues} to the values in the URL query string,
   * to be used as initial values in the form for SearchFilterView
   */
  const getSearchFieldValues = useCallback(() => {
    // Gets the query string search values in an object
    const querySearchData = queryString.parse(history.location.search);

    // Formats the object according to the form object shape (there's no [] in names)
    const formattedQuerySearchData = Object.keys(querySearchData).reduce(
      (acc, key) => {
        if (key.includes("[]")) {
          let content = [];

          if (typeof querySearchData[key] !== "object") {
            content.push(querySearchData[key]);
          } else {
            content = querySearchData[key];
          }

          acc[key.slice(0, key.length - 2)] = content;
        } else if (querySearchData[key] === "false") {
          acc[key] = false;
        } else if (querySearchData[key] === "true") {
          acc[key] = true;
        } else {
          acc[key] = querySearchData[key];
        }

        return acc;
      },
      {}
    );

    setUrlSearchFieldValues(formattedQuerySearchData);

    if (formattedQuerySearchData.anyMentorSkills) {
      setAnyMentorSkills(formattedQuerySearchData.anyMentorSkills);
    }
  }, [history.location.search]);

  /**
   * Get dropdown options for search filters
   *
   */
  const getFilterFormOptions = useCallback(async () => {
    try {
      // get dropdown options
      const [
        branch,
        location,
        classification,
        categoriesResult,
        skillsResults,
      ] = await Promise.all([
        axios.get(`api/option/branches?language=${locale}`),
        axios.get(`api/option/locations?language=${locale}`),
        axios.get(`api/option/classifications`),
        axios.get(`api/option/categories?language=${locale}`),
        axios.get(`api/option/skills?language=${locale}`),
      ]);

      setBranchOptions(branch.data);
      setLocationOptions(location.data);
      setClassOptions(classification.data);

      // generate formatted data tree for skills options
      const skillsDataTree = categoriesResult.data.map((category) => {
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

      setSkillOptions(skillsDataTree);
    } catch (error) {
      handleError(error, "redirect", history);
      throw error;
    }
  }, [axios, history, locale]);

  useEffect(getFilterFormOptions, [getFilterFormOptions]);
  useEffect(getSearchFieldValues, [getSearchFieldValues]);

  /**
   * Handle search functionality
   * @param {Object} values
   *
   */
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
    history.push(url);
  };

  /**
   * handle what happens when "any mentorship skills" is selected
   *
   */
  const handleAnyMentorSkillsChange = (e) => {
    setAnyMentorSkills(e.target.checked);
  };

  return (
    <SearchFilterView
      anyMentorSkills={anyMentorSkills}
      branchOptions={branchOptions}
      classOptions={classOptions}
      handleAnyMentorSkillsChange={handleAnyMentorSkillsChange}
      handleSearch={handleSearch}
      history={history}
      locationOptions={locationOptions}
      skillOptions={skillOptions}
      urlSearchFieldValues={urlSearchFieldValues}
    />
  );
};

export default SearchFilter;
