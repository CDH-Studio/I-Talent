import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import queryString from "query-string";
import { injectIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import config from "../../config";
import SearchFilterView from "./SearchFilterView";
import handleError from "../../functions/handleError";

const { backendAddress } = config;

const SearchFilter = () => {
  const [expand, setExpand] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [urlSearchFieldValues, setUrlSearchFieldValues] = useState(null);

  const history = useHistory();
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

  useEffect(() => {
    // Fetches options for skills select field in advanced search
    const getSkills = async () => {
      const results = await axios.get(
        `${backendAddress}api/option/developmentalGoals?language=${
          locale === "en" ? "ENGLISH" : "FRENCH"
        }`
      );
      setSkillOptions(results.data);
    };

    // Fetches options for branches select field in advanced search
    const getBranch = async () => {
      const results = await axios.get(
        `${backendAddress}api/option/branches?language=${
          locale === "en" ? "ENGLISH" : "FRENCH"
        }`
      );
      setBranchOptions(results.data);
    };

    // Fetches options for locations select field in advanced search
    const getLocation = async () => {
      const results = await axios.get(
        `${backendAddress}api/option/locations?language=${
          locale === "en" ? "ENGLISH" : "FRENCH"
        }`
      );

      setLocationOptions(results.data);
    };

    // Fetches options for classifications select field in advanced search
    const getClassification = async () => {
      const results = await axios.get(
        `${backendAddress}api/option/classifications`
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
  const handleSearch = (values) => {
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
    />
  );
};

SearchFilter.propTypes = {};

export default injectIntl(SearchFilter);
