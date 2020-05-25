import React, { useState, useEffect, useCallback } from "react";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { IntlPropType } from "../../../customPropTypes";
import SchoolTableView from "./SchoolTableView";
import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;

/**
 *  SchoolTable(props)
 *  Controller for the SchoolTableView.
 *  It gathers the required data for rendering the component.
 */
const SchoolTable = ({ type, intl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const size = "large";

  /* get school information */
  const getSchools = useCallback(async () => {
    try {
      const results = await axios.get(
        `${backendAddress}api/admin/options/${type}`
      );
      return results.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  }, [type]);

  /* useEffect will run if statement, when the component is mounted */
  /* useEffect will run else statement, if an addition, update/edit or deletion occurs in the table */
  useEffect(() => {
    if (loading) {
      const setState = async () => {
        await getSchools()
          .then(schools => setData(schools))
          .catch(error => handleError(error, true, true));
        // eslint-disable-next-line no-console
        setLoading(false);
      };
      setState();
    } else {
      const updateState = async () => {
        await getSchools()
          .then(schools => setData(schools))
          .catch(error => handleError(error, true, true));
        // eslint-disable-next-line no-console
        setReset(false);
      };
      updateState();
    }
  }, [getSchools, loading, reset]);

  /* get part of the title for the page */
  const getDisplayType = plural => {
    if (plural)
      return intl.formatMessage({
        id: `admin.${type}.plural`,
        defaultMessage: type,
      });

    return intl.formatMessage({
      id: `admin.${type}.singular`,
      defaultMessage: type,
    });
  };

  /* handles the search part of the column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  /* handles reset of column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  /* handles addition of a school */
  const handleSubmitAdd = async values => {
    try {
      const url = `${backendAddress}api/admin/options/${type}`;

      await axios.post(url, {
        country: values.addSchoolCountry.toUpperCase(),
        description: values.addSchoolName,
        state: values.addSchoolState.toUpperCase(),
      });

      setReset(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
    return undefined;
  };

  /* handles the update/edit of a school */
  const handleSubmitEdit = async (values, id) => {
    try {
      const url = `${backendAddress}api/admin/options/${type}/${id}`;

      await axios.put(url, {
        country: values.editSchoolCountry.toUpperCase(),
        description: values.editSchoolName,
        state: values.editSchoolState.toUpperCase(),
      });

      setReset(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
    return undefined;
  };

  /* handles the deletion of a school */
  const handleSubmitDelete = async () => {
    try {
      const url = `${backendAddress}api/admin/delete/${type}`;

      await axios.post(url, { ids: selectedRowKeys });

      setSelectedRowKeys([]);
      setReset(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return 0;
    }
    return undefined;
  };

  /* helper function to rowSelection */
  // Consult: function taken from Ant Design table components (updated to functional)
  const onSelectChange = _selectedRowKeys => {
    // Can access the keys of each school selected in the table
    setSelectedRowKeys(_selectedRowKeys);
  };

  /* handles row selection in the table */
  // Consult: function taken from Ant Design table components (updated to functional)
  const rowSelection = {
    onChange: _selectedRowKeys => {
      onSelectChange(_selectedRowKeys);
    },
  };

  /* configures data from backend into viewable data for the table */
  const convertToViewableInformation = () => {
    const allSchools = _.sortBy(data, "description");

    for (let i = 0; i < allSchools.length; i += 1) {
      allSchools[i].key = allSchools[i].id;
    }

    return allSchools;
  };

  document.title = `${getDisplayType(true)} - Admin | I-Talent`;

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <SchoolTableView
      handleSearch={handleSearch}
      handleReset={handleReset}
      handleSubmitAdd={handleSubmitAdd}
      handleSubmitEdit={handleSubmitEdit}
      handleSubmitDelete={handleSubmitDelete}
      selectedRowKeys={selectedRowKeys}
      searchedColumn={searchedColumn}
      searchText={searchText}
      size={size}
      rowSelection={rowSelection}
      data={convertToViewableInformation()}
    />
  );
};

SchoolTable.propTypes = {
  type: PropTypes.string.isRequired,
  intl: IntlPropType,
};

SchoolTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(SchoolTable);
