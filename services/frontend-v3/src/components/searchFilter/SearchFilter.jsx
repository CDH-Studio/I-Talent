import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import queryString from "query-string";
import { injectIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import config from "../../config";
import SearchFilterView from "./SearchFilterView";
import handleError from "../../functions/handleError";

const { backendAddress } = config;

const SearchFilter = () => {
  const [anyMentorSkills, setAnyMentorSkills] = useState(false);
  const [expand, setExpand] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [urlSearchFieldValues, setUrlSearchFieldValues] = useState(null);

  const history = useHistory();

  // get current language code
  const { locale } = useSelector((state) => state.settings);

  const toggle = () => {
    setExpand(!expand);
  };

  /**
   * Updates the state value {urlSearchFieldValues} to the values in the URL query string,
   * to be used as initial values in the form for SearchFilterView
   */
  const getSearchFieldValues = useCallback(() => {
    // Gets the query string search values in an object
    const querySearchData = queryString.parse(history.location.search);

    // Formats the object according to the form object shape (there's no [] in names)
    const formatedQuerySearchData = Object.keys(querySearchData).reduce(
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

    setUrlSearchFieldValues(formatedQuerySearchData);
  }, [history.location.search]);

  const handleAnyMentorSkillsChange = (e) => {
    setAnyMentorSkills(e.target.checked);
  };

  useEffect(() => {
    // Fetches options for skills select field in advanced search
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

    // Fetches options for branches select field in advanced search
    const getBranch = async () => {
      const results = await axios.get(`${backendAddress}api/option/getBranch`);
      setBranchOptions(
        results.data.filter((elem) => elem.description && elem.description.en)
      );
    };

    // Fetches options for locations select field in advanced search
    const getLocation = async () => {
      const results = await axios.get(
        `${backendAddress}api/option/getLocation`
      );

      setLocationOptions(results.data);
    };

    // Fetches options for classifications select field in advanced search
    const getClassification = async () => {
      const results = await axios.get(
        `${backendAddress}api/option/getGroupLevel`
      );

      setClassOptions(results.data);
    };

    const updateState = async () => {
      Promise.all([
        getSkills(),
        getBranch(),
        getLocation(),
        getClassification(),
      ]);
      await getSkills().catch((error) => handleError(error, "redirect"));
    };

    getSearchFieldValues();
    updateState();
  }, [getSearchFieldValues, locale]);

  // page with query
  const handleSearch = (unassignableValues) => {
    let values;
    if (unassignableValues.anyMentorSkills) {
      values = { ...unassignableValues, mentorshipSkills: undefined };
    } else {
      values = { ...unassignableValues, anyMentorSkills: undefined };
    }
    const query = queryString.stringify(values, { arrayFormat: "bracket" });
    const url = `/secured/results?${query}`;
    history.push(url);
    window.location.reload();
  };

  return (
    <SearchFilterView
      history={history}
      skillOptions={skillOptions}
      branchOptions={branchOptions}
      locationOptions={locationOptions}
      classOptions={classOptions}
      handleSearch={handleSearch}
      toggle={toggle}
      urlSearchFieldValues={urlSearchFieldValues}
      anyMentorSkills={anyMentorSkills}
      handleAnyMentorSkillsChange={handleAnyMentorSkillsChange}
    />
  );
};

SearchFilter.propTypes = {};

export default injectIntl(SearchFilter);
